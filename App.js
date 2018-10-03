import {Scene,Router} from 'react-native-router-flux';
import React, { Component } from 'react';
import HomeView from './HomeView.js';
import LoginContainer from './containers/LoginContainer';

import PollsContainer from './containers/PollsContainer.js';
import VoucherContainer from './containers/VoucherContainer.js';
import ClaimsContainer from './containers/ClaimsContainer.js';

export default class App extends Component {
  render() {

    return (
    <Router>
      <Scene key="root">
        <Scene key="LoginContainer" component={LoginContainer} hideNavBar />
        <Scene key="HomeView" component={HomeView} hideNavBar />
        <Scene key="PollsContainer" component={PollsContainer} hideNavBar />
        <Scene key="VoucherContainer" component={VoucherContainer} hideNavBar />
        <Scene key="ClaimsContainer" component={ClaimsContainer} hideNavBar />
      </Scene>
    </Router>
    );
  }
}