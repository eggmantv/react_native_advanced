import { Navigation } from 'react-native-navigation';
import LoginScreen from './app/login';
import FlexLayout from './app/flex_layout';
import NavigatorTest from './app/welcome/navigator_test';
import TabbarTest from './app/welcome/tabbar_test';

Navigation.registerComponent('LoginScreen', () => LoginScreen);
Navigation.registerComponent('FlexLayout', () => FlexLayout);

const AppStart = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: "首页",
        screen: 'LoginScreen',
        icon: require('./img/home.png'),
        selectedIcon: require('./img/home_selected.png'),
        title: "登录",
      },
      {
        label: "测试",
        screen: 'FlexLayout',
        icon: require('./img/menu.png'),
        selectedIcon: require('./img/menu_selected.png'),
        title: "Flex测试",
      }
    ]
  })
}

module.exports = AppStart;
