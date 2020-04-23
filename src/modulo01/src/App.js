import './config/devtools.config';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import Todo from './components/todo';

export default class App extends Component {
  state = {
    helloWorld: '',
    todos: [
      {id: 0, text: 'Fazer café'},
      {id: 1, text: 'Estudar GoNative'},
    ],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        helloWorld: 'hello world',
      });
    }, 3000);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {helloWorld: nextProps.helloWorld};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.todos.length <= 5;
  }

  componentDidUpdate(prevProps, prevState) {}

  // componentWillMount() {}

  componentDidCatch(err, info) {}

  addTodo = () => {
    this.setState({
      todos: [
        ...this.state.todos,
        {id: this.state.todos.length, text: 'Novo Todo'},
      ],
    });
  };

  render = () => (
    // <View style={styles.container}>
    //   <Text>{this.state.helloWorld}</Text>
    //   {this.state.todos.map((todo) => (
    //     <Todo key={todo.id} title={todo.text}></Todo>
    //   ))}
    //   <Button title="Adicionar todo" onPress={this.addTodo}></Button>
    // </View>

    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
  },

  box: {
    width: 80,
    height: 80,
    backgroundColor: '#F00',
    margin: 10,
  },
});
