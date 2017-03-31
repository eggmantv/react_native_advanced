import {
  AppRegistry,
} from 'react-native';
import LoginScreen from './app/login';

const AppStart = () => {
  AppRegistry.registerComponent("react_native_advanced", () => { return LoginScreen })
}

module.exports = AppStart;
