import React from 'react'
import GoogleMapReact from 'google-map-react';
import request from 'superagent'

const Bus = () => <img width="25" src='https://image.flaticon.com/icons/png/512/2/2322.png' alt="bus icon"/>;
const baseUrl = 'http://localhost:4000'


export default class BusMap extends React.Component {

  state={
    lat: null,
    lng: null
  }

  componentDidMount(){

    request(`${baseUrl}/`)
    .then(response => { 
      const gpsLat = response.body[0].gps.split("|")[0]
      const gpsLng = response.body[0].gps.split("|")[1]

      this.setState({
        lat: gpsLat,
        lng: gpsLng})
    })
    .catch(console.error)
  }

  render() {
    return (
      <div style={{width: '100%', height: '400px'}}>
      <GoogleMapReact
        center={{lat: 52, lng: 5}}
        defaultZoom={10}
        bootstrapURLKeys={{
          key: 'AIzaSyCd1Uh6uwM79vgsUHLc3xz2yq-vGwqqxmU'
        }}>
        {
          this.state.lat !== null && this.state.lng !== null &&
          <Bus lat={this.state.lat} lng={this.state.lng} />
        }
      </GoogleMapReact>
    </div>
    );
 
  }
}
