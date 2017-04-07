import {
  AppRegistry,
} from 'react-native';
// import LoginScreen from './app/login';
import FlexLayout from './app/flex_layout';
import NavigatorTest from './app/welcome/navigator_test';
import TabbarTest from './app/welcome/tabbar_test';

const AppStart = () => {
  AppRegistry.registerComponent("react_native_advanced", () => { return TabbarTest })
}

module.exports = AppStart;
