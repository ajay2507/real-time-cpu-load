import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        {this.props.children}
      </div>
    );
  }
}

export default Header;
