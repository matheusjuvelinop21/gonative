import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import api from '../../services/api';

export default class Welcome extends Component {
  state = {
    username: '',
    loading: false,
    error: false,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`users/${username}`);

    return user;
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@githuber:username', username);
  };

  signIn = async () => {
    this.setState({loading: true});

    try {
      await this.checkUserExists(this.state.username);
      await this.saveUser(this.state.username);

      this.props.navigation.navigate('User');
    } catch (error) {
      this.setState({loading: false, error: true});
    }
  };

  render = () => (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.text}>
        Para continuar precisamos que você informe seu usuário no Github.
      </Text>

      {this.state.error && (
        <Text style={styles.error}>Usuário inexistente</Text>
      )}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário"
          underlineColorAndroid="transparent"
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
        />

        <TouchableOpacity style={styles.button} onPress={this.signIn}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Prosseguir</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
