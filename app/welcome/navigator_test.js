import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  NavigatorIOS,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class NavigatorTest extends Component {
  render() {
    const routes = [
      {title: 'First Scene', index: 0},
      {title: 'Second Scene', index: 1},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => this._renderScenes(route, navigator)}
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
                { return (<Text style={{paddingLeft: 12}}>返回</Text>); },
               RightButton: (route, navigator, index, navState) =>
                 { return (<Text style={{paddingRight: 12}}>确认</Text>); },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={{fontWeight: "700"}}>标题</Text>); },
             }}
             style={{backgroundColor: 'white',borderBottomWidth: 1,borderBottomColor: '#eee'}}
           />
        }
        style={{flex: 1,marginTop: 20}}
      />
    );
  }

  _renderScenes(route, navigator) {
    let content = null;
    if (route.index == 0) {
      content = <FirstScreen route={route} navigator={navigator} />
    } else if (route.index == 1) {
      content = <SecondScreen route={route} navigator={navigator} />
    }

    return content;
  }
}

class FirstScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigator.push({index: 1});
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Screen 1</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class SecondScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigator.pop();
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Screen 2</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: '#f1f2f2'
  },
  btn: {
    marginTop: 50,
  },
  btnText: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  }
})
