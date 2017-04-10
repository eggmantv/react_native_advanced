import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  _touchHeader() {
    console.log(this.refs.header.props.children);
  }

  _login() {
    console.log(this.state.email + " " + this.state.password);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{}}
        horizontal={false}>
        <View style={styles.header}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            ref="email"
            autoCapitalize="none"
            placeholder="邮箱"
            autoCorrect={false}
            style={styles.inputText}
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            ref="password"
            autoCapitalize="none"
            placeholder="密码"
            autoCorrect={false}
            secureTextEntry={true}
            style={styles.inputText}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <TouchableHighlight
          style={styles.btnContainer}
          onPress={() => this._login()}
          underlayColor="red">
          <Text style={styles.bigBtn}>登录</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 100,
  },
  header: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: '900',
  },
  inputRow: {
    height: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#eee',
    justifyContent: "center",
    borderRadius: 3,
  },
  inputText: {
    flex: 1,
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 3,
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#333333',
  },
  bigBtn: {
    color: '#ffffff',
  },
})
