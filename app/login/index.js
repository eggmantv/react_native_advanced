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

  Alert,
  AsyncStorage,
} from 'react-native';
import { HelperMemo } from '../helper';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      isLoggedIn: !!HelperMemo.user_data,
    }
  }

  _touchHeader() {
    console.log(this.refs.header.props.children);
  }

  _login() {
    if (this.state.email.length == 0) {
      Alert.alert("提示", "请输入邮箱!");
      return;
    }

    let _this = this;
    let data = {email: this.state.email};
    AsyncStorage.setItem('user_data', JSON.stringify(data), () => {
      HelperMemo['user_data'] = data;

      Alert.alert("提示", "登录成功!");
      _this.setState({isLoggedIn: true});
    })

    console.log(this.state.email + " " + this.state.password);
  }

  _logout() {
    let _this = this;

    AsyncStorage.removeItem('user_data', () => {
      HelperMemo['user_data'] = null;

      Alert.alert("提示", "退出成功!");
      _this.setState({isLoggedIn: false});
    })
  }

  _renderLogin() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{}}
        horizontal={false}
        showsVerticalScrollIndicator={true}>
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

  _renderUserInfo() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{}}
        horizontal={false}
        showsVerticalScrollIndicator={true}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{HelperMemo.user_data.email}</Text>
        </View>
        <TouchableHighlight
          style={styles.btnContainer}
          onPress={() => this._logout()}
          underlayColor="red">
          <Text style={styles.bigBtn}>退出</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }

  render() {
    if (this.state.isLoggedIn) {
      return this._renderUserInfo();
    } else {
      return this._renderLogin();
    }
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
