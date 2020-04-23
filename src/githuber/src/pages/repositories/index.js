import React, {Component} from 'react';

import {View, ActivityIndicator, FlatList} from 'react-native';
import Header from '../../components/header';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import RepositoryItem from './item';

export default class Repositories extends Component {
  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="list-alt" size={20} color={tintColor} />
    ),
  };

  async componentDidMount() {
    await this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({refreshing: true});
    const username = await AsyncStorage.getItem('@githuber:username');
    const {data} = await api.get(`users/${username}/repos`);

    this.setState({data, loading: false, refreshing: false});
  };

  render = () => (
    <View style={styles.container}>
      <Header title="Repositórios" />
      {this.state.loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <RepositoryItem repository={item} />}
          onRefresh={this.loadRepositories}
          refreshing={this.state.refreshing}
        />
      )}
    </View>
  );
}
