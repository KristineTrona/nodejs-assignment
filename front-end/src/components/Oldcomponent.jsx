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

  // findBus = () => {

  //   request(`${baseUrl}/`)
  //   .then(response => { 
  
  //     const gpsLat = parseFloat(response.body[0].gps.split("|")[0])
  //     const gpsLng = parseFloat(response.body[0].gps.split("|")[1])
      
  //     this.setState({
  //       lat: gpsLat,
  //       lng: gpsLng})
  //   }).catch(console.error)
  // }

  componentDidMount(){
    this.findBus()
    console.log(this.state)
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
            center={this.state.lat === null ? {lat: 52, lng:5} : this.state}
            zoom={this.state.lat === null ? 9 : 14}
            bootstrapURLKeys={{
              key: 'AIzaSyCd1Uh6uwM79vgsUHLc3xz2yq-vGwqqxmU'
            }}>
            {
              this.state.lat !== null && this.state.lng !== null &&
              <Bus lat={this.state.lat} lng={this.state.lng} />
            }
          </GoogleMapReact>
        </div>
    </div>
    );
 
  }
}
