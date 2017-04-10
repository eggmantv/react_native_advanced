import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ProductShowScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rowTitle}>{this.props.data.title}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowTitle: {
    flex: 5,
    fontSize: 16,
    fontWeight: "700",
  },
});
