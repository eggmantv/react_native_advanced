import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import GlobalStyle from './components/global_style';

export default class FlexLayout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topContent}>
          </View>
        </View>
        <View style={styles.middle}>
          <View style={styles.middleLeft}>
            <Text>middle left</Text>
          </View>
          <View style={styles.middleRight}>
            <Text>middle right</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={GlobalStyle.btn}>bottom button</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  top: {
    backgroundColor: '#ddd',
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  bottom: {
    backgroundColor: 'blue',
  },
  topContent: {
    height: 100,
  },
  middleLeft: {
    flex: 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRight: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btn: {
    paddingVertical: 15,
    textAlign: 'center',
    color: 'white',
  }
})
