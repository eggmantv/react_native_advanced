import { Navigation } from 'react-native-navigation';
import LoginScreen from './app/login';
import FlexLayout from './app/flex_layout';
import NavigatorTest from './app/welcome/navigator_test';
import TabbarTest from './app/welcome/tabbar_test';
import ProductsScreen from './app/products';
import ProductShowScreen from './app/products/show';
import WebViewTest from './app/webview_test';

Navigation.registerComponent('LoginScreen', () => LoginScreen);
Navigation.registerComponent('FlexLayout', () => FlexLayout);
Navigation.registerComponent('ProductsScreen', () => ProductsScreen);
Navigation.registerComponent('ProductShowScreen', () => ProductShowScreen);
Navigation.registerComponent('WebViewTest', () => WebViewTest);

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
        label: "商品",
        screen: 'ProductsScreen',
        icon: require('./img/menu.png'),
        selectedIcon: require('./img/menu_selected.png'),
        title: "商品",
      },
      {
        label: "WebView",
        screen: 'WebViewTest',
        icon: require('./img/safari.png'),
        selectedIcon: require('./img/safari_selected.png'),
        title: "WebView",
      },
      {
        label: "测试",
        screen: 'FlexLayout',
        icon: require('./img/user.png'),
        selectedIcon: require('./img/user_selected.png'),
        title: "Flex测试",
      }
    ]
  })
}

module.exports = AppStart;
