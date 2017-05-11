import React, { Component } from 'react';

// Viewer component - represents a single connected user
export default class Viewer extends Component {
  render() {
    return (
      <li>{this.props.ipSession ? this.props.ipSession.clientAddress : ''}</li>
    );
  }
}
