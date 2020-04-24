import React from 'react';

import {Provider} from 'react-redux';

import './config/status-bar.config';

import Routes from './routes';

import store from './store';

import Player from './components/player';

const App = () => (
  <Provider store={store}>
    <Routes />
    <Player />
  </Provider>
);

export default App;
