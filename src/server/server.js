import bodyParser from 'body-parser'
import express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'

import configureStore from '../client/store/configure_store'
import { syncHistoryWithStore } from 'react-router-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import routes from '../client/routes/routes'
import { Provider } from 'react-redux'

const port = 8080

let app = express()
let server = app.listen(port, ()=> console.log(`Server is listening on port: ${server.address().port}...`))

app.use(bodyParser.json({}))

if(process.env.NODE_ENV === 'development'){
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack/webpack.client.config.js')('dev')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))
}

//Express API Routes
//app.use(express.static('./public'))
//app.use(require('./routes/index'))

app.use(handleRender)

function handleRender(req, res) {

  const memoryHistory = createMemoryHistory(req.path)
  let store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)
  

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      store = configureStore(memoryHistory, store.getState() )
      
      const content = renderToString(
        <Provider store={ store }>
          <RouterContext {...renderProps} />
        </Provider>
      )
      res.status(200).send(renderFullPage(content, store.getState()))
    } else {
      res.status(404).send('Not found')
    }
  })
}

function renderFullPage(html, initialState) {
  const VERSION = process.env.NODE_ENV === 'development' ? 'dev' : String(require('json!../../package.json').version)
  const vendorPath = process.env.NODE_ENV === 'development' ? '': `<script src="vendor.bundle-${VERSION}.js"></script>`

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=11">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Great Scott</title>
        <style> html, body, #root { width: 100%; height: 100%} </style>
      </head>
      <body>
        <div id="root">${ html }</div>
        <script>
          window.__initialState__ = ${JSON.stringify(initialState)}
        </script>
        ${vendorPath}
        <script src="client-${VERSION}.js"></script>
      </body>
    </html>`

}