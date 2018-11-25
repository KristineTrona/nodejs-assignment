import React from 'react'
import GoogleMapReact from 'google-map-react';
import request from 'superagent'
import {Bus} from './Bus'
    
const baseUrl = 'http://localhost:4000'


export default class BusMap extends React.Component {

  state={
    lat: null,
    lng: null,
    battery: null
  }

  findBus = () => {

    request(`${baseUrl}/`)
    .then(response => { 
  
      const gpsLat = parseFloat(response.body[0].gps.split("|")[0])
      const gpsLng = parseFloat(response.body[0].gps.split("|")[1])
      const currentBattery = response.body[0].soc

      this.setState({
        lat: gpsLat,
        lng: gpsLng,
        battery: currentBattery})
    }).catch(console.error)

    console.log(this.state)
  }

  componentDidMount(){
    this.findBus()
  }


  // componentDidUpdate(prevState) {
  //   if (this.state !== prevState) {
  //     this.findBus();
  //   }
  // }

  render() {
    return (
      <div className="map-container">
        <h1 className="map-title">Henk's bus route</h1>
        <div className="bus-map">
          <GoogleMapReact
            center={this.state.lat === null ? {lat: 52, lng:5} : {lat: this.state.lat, lng: this.state.lng}}
            zoom={this.state.lat === null || this.state.lat === 52 ? 9 : 14}
            bootstrapURLKeys={{
              key: 'AIzaSyCd1Uh6uwM79vgsUHLc3xz2yq-vGwqqxmU'
            }}>
            {
              this.state.lat !== null && this.state.lng !== null &&
              <Bus lat={this.state.lat} lng={this.state.lng} battery={this.state.battery} />
            }
          </GoogleMapReact>
        </div>
    </div>
    );
 
  }
}
