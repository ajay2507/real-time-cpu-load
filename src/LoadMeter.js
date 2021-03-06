import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import Header from './Header';
import './index.css';

/* Component for Meter chart */
class LoadMeter extends Component {
  render() {
  	//console.log("Load meter");

    return (
      <div className="textCenter speedometer">
        <Header>Real Time System Load</Header>
        <ReactSpeedometer
        maxValue={100}
    	value={this.props.value}
    	needleColor="red"
    	startColor="green"
    	segments={10}
    	endColor="blue"
		/>
      </div>
    );
  }
}

export default LoadMeter;
