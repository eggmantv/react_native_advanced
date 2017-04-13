import React, { Component } from 'react';
import {
  View,
  PushNotificationIOS,
  Button,
  AlertIOS,
} from 'react-native';

export default class SystemNotification extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', this._onRegistered);
    PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);

    PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);

    PushNotificationIOS.requestPermissions();
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', this._onRegistered);
    PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._sendLocalNotification}
          title="测试发送Local Notification"
        />

        <Button
          onPress={this._checkPermissions}
          title="是否开启通知"
        />
      </View>
    );
  }

  _sendLocalNotification() {
    require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
      aps: {
        alert: '测试Local Notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onRegistered(deviceToken) {
    console.log("JS deviceToken: " + deviceToken);

    // set badge to zero
    // PushNotificationIOS.setApplicationIconBadgeNumber(0);

    // send device token, and device's badge number will be set to 0 in backend.
    AlertIOS.alert("token", deviceToken);
  }

  _onRegistrationError(error) {
    AlertIOS.alert(
      '注册Push Notification失败',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'OK',
        onPress: null,
      }]
    );
  }

  _onRemoteNotification(notification) {
    AlertIOS.alert(
      '收到Push Notification',
      '消息内容: ' + notification.getMessage(),
      [{
        text: 'OK',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification){
    AlertIOS.alert(
      '收到Local Notification',
      "",
      [{
        text: 'OK',
        onPress: null,
      }]
    );
  }

  _checkPermissions() {
    PushNotificationIOS.checkPermissions((callback) => {
      AlertIOS.alert(
        "通知权限检查",
        JSON.stringify(callback)
      )
    })
  }

}
