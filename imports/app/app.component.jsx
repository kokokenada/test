import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { ReduxPackageCombiner} from 'redux-package';
import ViewerList from '../ui/viwer-list';

export default class Toplevel extends Component {
  render() { return (
    <Provider store={ReduxPackageCombiner.getStore()}>
      <ViewerList/>
    </Provider>
  )}
}