import React, { Component } from 'react';
import Header from './Header';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,Legend  } from 'recharts';

class LineChartComponent extends Component {
  
  constructor(props) {
  	super(props);
  	this.state = {
  		count:1
  	}
  }

  render() {
  	let count = this.state.count+1;
  	console.log(this.props);
    return (
      <div>
        <Header>System Load Since Page Load</Header>
        <LineChart width={600} height={300} data={this.props.value}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="amt"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone"  stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="CPUload" stroke="#82ca9d" />
      </LineChart>
      </div>
    );
  }
}

export default LineChartComponent;
