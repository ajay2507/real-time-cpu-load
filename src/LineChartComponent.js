import React, { Component } from 'react';
import Header from './Header';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip  } from 'recharts';

class LineChartComponent extends Component {
  render() {
    return (
      <div>
        <Header>System Load Since Page Load</Header>
        <LineChart width={600} height={300} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  		<Line type="monotone" dataKey="uv" stroke="#8884d8" />
  		<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  		<XAxis dataKey="name" />
  		<YAxis />
  		<Tooltip />
		</LineChart>
      </div>
    );
  }
}

export default LineChartComponent;
