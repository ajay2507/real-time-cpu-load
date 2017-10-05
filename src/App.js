import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Header from './Header';
import LoadMeter from './LoadMeter';

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
        <Header />
        <h1>Ajay kumar</h1>
      </div>
    );
  }
}

export default App;
