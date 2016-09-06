import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/nav'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps"

class Details extends React.Component {
  constructor(props){
    super(props)
  }

  onMapClick =()=>{

  }

  onMarkerRightclick =()=>{

  }

  render(){

    const { markers } = this.props

    return(
<<<<<<< HEAD
      <div>
        <div className="details">
          <Nav location="details"/>
        </div>
        <div className="kraft-section">
          <div className="callout">
            <h2>we are so honored that you are able to join us on our special day!</h2>
          </div>
        </div>
=======
      <div className="details">
        <Nav location="details"/>


        <GoogleMapLoader
          containerElement={
            <div style={{
                height: 200,
                width: 200 }}/> }
          googleMapElement={
            <GoogleMap
              defaultOptions={{
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
              }}
              defaultZoom={ 15 }
              defaultCenter={{
                lat: 35.329155,
                lng: -80.634645,
              }}
              onClick={ this.onMapClick }>
              {markers.map((marker, index) => {
                return (
                  <Marker
                    draggable={ false }
                    {...marker}
                    onRightclick={() => this.onMarkerRightclick(index) } />
                );
              })}
            </GoogleMap>
          }/>



>>>>>>> cfd3706588dce5de460c17b517042a17cf29a255
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    markers: state.details.markers
  }
}

export default connect(mapStateToProps, {

})(Details)