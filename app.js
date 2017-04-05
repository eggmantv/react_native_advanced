import {
  AppRegistry,
} from 'react-native';
// import LoginScreen from './app/login';
import FlexLayout from './app/flex_layout';

const AppStart = () => {
  AppRegistry.registerComponent("react_native_advanced", () => { return FlexLayout })
}

module.exports = AppStart;
