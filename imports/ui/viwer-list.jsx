import React, { Component } from 'react';
import { connect } from 'react-redux';
import Viewer from './viewer.jsx';

// ViewerList component - represents the whole app
class _ViewerList extends Component {

  renderViewers() {
    return this.props.ipSessions.ips.map((ipSession) => (
        <Viewer key={ ipSession.id } ipSession = { ipSession } />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>IPs</h1>
        </header>
        <h2>Last Connected IP</h2>
        <Viewer ipSession = { this.props.ipSessions.lastConnected } />
        <h2>Currently Connected IPs</h2>
        <ul>
          {this.renderViewers()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ipSessions: state.ipSessions
  }
};

const ViewerList = connect(mapStateToProps)(_ViewerList);
export default ViewerList;
