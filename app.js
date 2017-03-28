import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native开发</Text>
        <Text style={styles.welcome2}>hello world!</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  welcome2: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  }
})

const AppStart = () => {
  AppRegistry.registerComponent("react_native_advanced", () => { return App })
}

module.exports = AppStart;
