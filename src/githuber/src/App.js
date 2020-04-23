import React, {Component} from 'react';

import createNavigator from './routes';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@githuber:username');

    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    if (!this.state.userChecked) {
      return null;
    }

    const Routes = createNavigator(this.state.userLogged);

    return <Routes />;
  }
}
