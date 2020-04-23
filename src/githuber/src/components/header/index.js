import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends Component {
  signOut = async () => {
    await AsyncStorage.clear();

    this.props.navigation.navigate('Welcome');
  };

  render = () => (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.left} />
      <Text style={styles.title}>{this.props.title}</Text>
      <TouchableOpacity onPress={this.signOut}>
        <Icon name="exchange" size={16} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Header);
