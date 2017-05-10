import React, { Component } from 'react';
import { connect } from 'react-redux';

import Viewer from './viewer.jsx';

// ViewerList component - represents the whole app
class _ViewerList extends Component {

  renderViewers() {
    console.log(this.props.ipSessions.ips)
    return this.props.ipSessions.ips.map((task) => (
        <Viewer key={task.is} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>IPs</h1>
        </header>

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
