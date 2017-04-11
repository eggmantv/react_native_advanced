import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
  ScrollView,

	Platform,
  Alert,
  AlertIOS,
  ActionSheetIOS,
	Linking,
} from 'react-native';

export default class OthersTest extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1,flexDirection: 'column'}}>
        {/* Alert */}
        <AlertTest />
        {/* AlertIOS */}
        <AlertIOSTest />

        <ActionSheetIOSTest />

				<LinkingTest url="https://eggman.tv" text="打开URL" />
      </ScrollView>
    )
  }
}

class AlertTest extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.btn} onPress={() => {
        Alert.alert("提示", "提示内容", [
          { text: "Cancel", onPress: () => { console.log("clicked cancel!") } },
          { text: "Later", onPress: () => { console.log("clicked later!") } },
          { text: "OK", onPress: () => { console.log("click OK!") } },
        ])
      }}>
        <Text style={styles.btnText}>Alert</Text>
      </TouchableHighlight>
    )
  }
}

class AlertIOSTest extends Component {
  render() {
    if (Platform.OS == 'ios') {
      return (
        <TouchableHighlight style={styles.btn} onPress={() => {
          AlertIOS.prompt("更新", "输入你的用户名", [
            { text: "Cancel", onPress: () => { console.log("clicked cancel!") } },
            { text: "OK", onPress: (text) => { console.log("get " + text) } },
          ])
        }}>
          <Text style={styles.btnText}>AlertIOS.prompt</Text>
        </TouchableHighlight>
      )
    } else {
      return null;
    }
  }
}

class ActionSheetIOSTest extends Component {
  render() {
    if (Platform.OS == 'ios') {
      return (
        <TouchableHighlight style={styles.btn} onPress={() => {
          ActionSheetIOS.showActionSheetWithOptions({
            options: ['微信', '微博', '豆瓣', 'QQ', 'Cancel'],
            cancelButtonIndex: 4,
            title: "分享",
            message: "请选择分享方式",
          }, (buttonIndex) => {
            console.log("button " + buttonIndex + " selected!");
          })
        }}>
          <Text style={styles.btnText}>ActionSheetIOS</Text>
        </TouchableHighlight>
      )
    } else {
      return null;
    }
  }
}

class LinkingTest extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.btn} onPress={() => {
        Linking.canOpenURL(this.props.url).then(supported => {
          if (supported) {
            Linking.openURL(this.props.url);
          } else {
            console.log('can not open url: ' + this.props.url);
          }
        });
      }}>
        <Text style={styles.btnText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 15,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  btnText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  }
})
