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
      count:0,
      endpoint: "http://127.0.0.1:8000",
      valueArray: []
      
    };
  }

  // Execute after the component gets mounted
  componentDidMount() {
    
    const { endpoint } = this.state;
    // configure socket on client side
    const socket = socketIOClient(endpoint, {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("FromAPI", data => {
      let array = this.state.valueArray;
      array.push(this.state);
      if(array.length > 4){
         this.setState({ count: 0,  valueArray: array });
         array.shift();
      }
      this.setState({CPUload: data, count:this.state.count+1});
  })

  }


  render() {
    
    return (
      <div>
        <LoadMeter className="textCenter" value={this.state.CPUload} />
        {this.state.CPUload && <LineChartComponent className="textCenter" value={this.state.valueArray} />}
        {!this.state.CPUload && <div>Loading....</div>} 
      </div>
    );
  }
}

export default App;
