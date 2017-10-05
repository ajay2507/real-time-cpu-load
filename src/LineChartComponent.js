import React, { Component } from 'react';
import Header from './Header';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,Legend  } from 'recharts';
import './index.css';

class LineChartComponent extends Component {
  
  constructor(props) {
  	super(props);
  }

  render() {
  	
    return (
      <div className="textCenter">
        <Header>System Load Since Page Load</Header>
        <div className="lineChart">
        <LineChart width={800} height={300} data={this.props.value}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="count" />
       <YAxis />
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone"  dataKey="CPUload" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone"  stroke="#82ca9d" />
      </LineChart></div>
      </div>
    );
  }
}

export default LineChartComponent;
