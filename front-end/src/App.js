import React, { Component } from 'react';
import './App.css';
import BusMap from './components/Map'
// import io from 'socket.io-client'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BusMap/>
      </div>
    );
  }
}

