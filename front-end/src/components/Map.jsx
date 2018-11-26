import React from 'react'
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux'
import {Bus} from './Bus'
import {key} from '../constants'
import {findBus} from '../actions/busData'
import io from 'socket.io-client'


class BusMap extends React.Component {

  componentDidMount(){
    let socket = io.connect('http://localhost:4000');

    if(socket !== undefined){
      console.log('Socket connected')

      socket.on('output', (data) => {
        this.props.findBus()
      })
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {

    const {testbus1} = this.props 
    
    return (
      <div className="map-container">
        <h1 className="map-title">Henk's bus route</h1>
        <div className="bus-map">

          {(testbus1.length !== 0  && testbus1[0].gps) &&
            <GoogleMapReact
              // center={this.props.testbus1 === null ? {lat: 52, lng:5} : {lat: this.state.lat, lng: this.state.lng}}
              // zoom={this.state.lat === null || this.state.lat === 52 ? 9 : 14}
              center={{lat: parseFloat(testbus1[0].gps.split("|")[0]), 
                  lng: parseFloat(testbus1[0].gps.split("|")[1])}}
              zoom={14}
              bootstrapURLKeys={{
                key: key}}>
              <Bus 
                lat={parseFloat(testbus1[0].gps.split("|")[0])} 
                lng={parseFloat(testbus1[0].gps.split("|")[1])}
                battery={testbus1[0].soc} />          
            </GoogleMapReact>
          }
          { testbus1.length === 0 && 
            <GoogleMapReact
              center={{lat: 52, lng: 5}}
              zoom={9}
              bootstrapURLKeys={{
                key: key}}>        
            </GoogleMapReact>
          }
        </div>
    </div>
    );
 
  }
}

const mapStateToProps = function (state) {
	return {
    testbus1: state.testbus1
	}
}

const mapDispatchToProps = {
  findBus
	}

export default connect(mapStateToProps, mapDispatchToProps)(BusMap)
