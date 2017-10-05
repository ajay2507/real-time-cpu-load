import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import LoadMeter from './LoadMeter';
import LineChartComponent from './LineChartComponent';

class App extends Component {
  
   constructor() {
    console.log("constructor");
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8000"
    };
  }

  componentDidMount() {
    console.log("componentdidmount");
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("FromAPI", data => this.setState({response: data }));
  }


  render() {
    console.log("render");
    console.log(this.state);
    return (
      <div>
        <LoadMeter value={this.state.response} />
        <LineChartComponent />
      </div>
    );
  }
}

export default App;
