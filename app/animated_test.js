import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
  Animated,
  Dimensions,
	PanResponder,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const TABS = ["tab1", "tab2"];
const TABS_COUNT = TABS.length;

export default class AnimatedTest extends Component {

	constructor(props) {
		super(props);

		this.state = {
      currentTab: 'tab1',
      tabLineAnimatedValue: new Animated.Value(0),
		}
	}

	componentWillMount() {
		let _this = this;

		let release = (e, gestureState) => {
			let relativeDistance = gestureState.dx / DEVICE_WIDTH,
					velocityX = gestureState.vx;

			let step = 0;
			if (relativeDistance < -0.5 || (relativeDistance < 0 && velocityX <= -0.03)) {
				step = 1;
			} else if (relativeDistance >= 0.5 || (relativeDistance > 0 && velocityX >= 0.03)) {
				step = -1;
			}

			_this.movePage(step);
		}

		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (e, gestureState) => {
				let tabIndex = TABS.indexOf(_this.state.currentTab);
				if (tabIndex == 0 && gestureState.dx > 0) {
					return false;
				}
				if (tabIndex == TABS_COUNT - 1 && gestureState.dx < 0) {
					return false;
				}

				return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
			},
			onPanResponderMove: (e, gestureState) => {
				let offsetX = -gestureState.dx / DEVICE_WIDTH + TABS.indexOf(_this.state.currentTab);
				_this.state.tabLineAnimatedValue.setValue(offsetX);
			},
			onPanResponderRelease: release,
			onPanResponderTerminate: release,
		})
	}

	movePage(step) {
		let nextTabIndex = TABS.indexOf(this.state.currentTab) + step;
		this.touchTab(TABS[nextTabIndex]);
	}

	render() {
		return (
			<View style={styles.container}>
        <View style={styles.tabBar}>
          <Animated.View
            style={[styles.line, {
                left: this.state.tabLineAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, DEVICE_WIDTH / TABS_COUNT]
                })
              }]}
            >
          </Animated.View>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.tab]}
            onPress={this.touchTab.bind(this, 'tab1')}>
              <View>
                <Text style={[styles.tabText, (this.state.currentTab == 'tab1' ? styles.currentText : {})]}>Tab 1</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.tab]}
            onPress={this.touchTab.bind(this, 'tab2')}>
            <View>
              <Text style={[styles.tabText, (this.state.currentTab == 'tab2' ? styles.currentText : {})]}>Tab 2</Text>
            </View>
          </TouchableOpacity>
        </View>
				<Animated.View
					style={[styles.content, {
            transform: [{
              translateX: this.state.tabLineAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -DEVICE_WIDTH]
              }),
            }]
          }]}
					{...this._panResponder.panHandlers}>
		    	<View style={styles.slideContent}>
		    		<Text style={styles.slideContentText}>Tab 1 content</Text>
		    	</View>
          <View style={styles.slideContent}>
		    		<Text style={styles.slideContentText}>Tab 2 content</Text>
		    	</View>
		    </Animated.View>
			</View>
		);
	}

  touchTab(currentTab) {
    this.setState({currentTab});

    Animated.timing(
      this.state.tabLineAnimatedValue,
      {
        toValue: (currentTab == 'tab2' ? 1 : 0),
        duration: 200,
      }
    ).start((result) => {
      console.log(result);
      console.log("animation finished!");
    });
  }
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
  tabBar: {
    backgroundColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '100',
    color: '#333333',
  },
  currentText: {
    fontWeight: '600',
  },
  line: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#333',
    width: DEVICE_WIDTH / TABS_COUNT,
    bottom: 0,
  },

  content: {
    flex: 1,
    width: DEVICE_WIDTH * TABS_COUNT,
    flexDirection: 'row',
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slideContentText: {
    fontSize: 24,
    fontWeight: '500'
  }
});
