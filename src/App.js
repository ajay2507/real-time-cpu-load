import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import LoadMeter from './LoadMeter';
import LineChartComponent from './LineChartComponent';

import './index.css';

class App extends Component {
  
   constructor() {
    console.log("constructor");
    super();
    this.state = {
      CPUload: false,
      endpoint: "http://127.0.0.1:8000",
      valueArray:[]
    };
  }

  componentDidMount() {
    console.log("componentdidmount");
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("FromAPI", data => {
      let array = this.state.valueArray;
      array.push(this.state);
      if(array.length > 4){
         array.shift();
      }
      this.setState({CPUload: data, valueArray: array });
  })

  }


  render() {
    console.log("render");
    console.log(this.state);
    return (
      <div>
        <LoadMeter className="textCenter" value={this.state.CPUload} />
        {this.state.CPUload && <LineChartComponent className="textCenter" value={this.state.valueArray} />}
      </div>
    );
  }
}

export default App;
