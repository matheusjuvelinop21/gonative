import React, {Component} from 'react';
import api from '../../services/api';
import {View, AsyncStorage, ActivityIndicator, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/header';

import OrganizationItem from './item';
import styles from './styles';

export default class Organizations extends Component {
  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="building" size={20} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({refreshing: true});

    const username = await AsyncStorage.getItem('@githuber:username');
    const {data} = await api.get(`users/${username}/orgs`);

    this.setState({data, loading: false, refreshing: false});
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <OrganizationItem organization={item} />}
            onRefresh={this.loadOrganizations}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            refreshing={this.state.refreshing}
          />
        )}
      </View>
    );
  }
}
