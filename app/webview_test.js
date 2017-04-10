import React, { Component } from 'react';
import {
  WebView,
  View,
  StyleSheet,
} from 'react-native';

export default class WebViewTest extends Component {
  render() {
    var url = this.props.url || "https://eggman.tv";

    return (
      <View style={{flex: 1}}>
        <WebView
          style={{flex: 1}}
          ref="webview"
          source={{uri: url}}
          contentContainerStyle={{padding: 15,}}
          onLoadStart={this._onLoadStart.bind(this)}
          onLoadEnd={this._onLoadEnd.bind(this)}
          onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
      </View>
    )
  }

  _onShouldStartLoadWithRequest(navState) {
    if (navState.navigationType == 'click') {
      this.props.navigator.push({
        title: "Detail",
        screen: "WebViewTest",
        passProps: { url: navState.url }
      });
      return false;
    } else {
      return true;
    }
  }

  _onNavigationStateChange(navState) {
    console.log(navState);
  }

  _onLoadStart() {

  }

  _onLoadEnd() {

  }
}
