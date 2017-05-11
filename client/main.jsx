import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { initApp } from '../imports/app/init-app';

import Toplevel from '../imports/app/top-level';

Meteor.startup(() => {
  initApp();

  render(<Toplevel />, document.getElementById('render-target'));
});