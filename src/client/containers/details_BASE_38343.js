import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/nav'

class Details extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="details">
        <Nav location="details"/>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, {

})(Details)