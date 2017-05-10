import React, { Component, PropTypes } from 'react';

// Viewer component - represents a single todo item
export default class Viewer extends Component {
  render() {
    return (
      <li>{this.props.ipSession ? this.props.ipSession.clientAddress : ''}</li>
    );
  }
}
