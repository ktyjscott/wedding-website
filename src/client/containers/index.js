import React from 'react'
import { connect } from 'react-redux'

import * as indexActions from '../actions/index_actions'

class Index extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    let style = {
      
    }
    
    return(
      <div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    someProp: state.index.someProp
  }
}

export default connect(mapStateToProps, {
  indexAction: indexActions.indexAction
})(Index)