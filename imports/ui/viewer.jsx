import React, { Component, PropTypes } from 'react';

// Viewer component - represents a single todo item
export default class Viewer extends Component {
  render() {
    return (
      <li>{this.props.task.clientAddress}</li>
    );
  }
}

Viewer.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};