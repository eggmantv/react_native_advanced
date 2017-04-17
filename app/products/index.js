import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ListView,
  Alert,
  RefreshControl,
} from 'react-native';

export default class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataRows = [];

    this.state = {
      isDataLoaded: false,
      dataSource: ds.cloneWithRows(this.dataRows),
      page: 1,
      isRefreshing: false,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    var _this = this;

    if (this.state.page == -1)
      return;

    fetch("https://eggman.tv/public/lessons?page=" + this.state.page)
    .then(function(response) {
      if (response.ok == true) {
        response.json().then(function(rsp) {
          if (rsp.status == 'ok') {
            _this.dataRows = _this.dataRows.concat(rsp.data.lessons);

            _this.setState({
              isDataLoaded: true,
              dataSource: _this.state.dataSource.cloneWithRows(_this.dataRows),
              page: rsp.data.next_page,
              isRefreshing: false,
            })
          } else {
            Alert.alert("Error", "API error");
          }
        })
      } else {
        Alert.alert("Error", "Server error");
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderSeparator={this._renderSeparator.bind(this)}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          onEndReached={this._reachEnd.bind(this)}
          onEndReachedThreshold={2}
          initialListSize={1}
          scrollRenderAheadDistance={0}
          pageSize={10}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing}
              onRefresh={this._refreshData.bind(this)} />
          }
        />
      </View>
    )
  }

  _refreshData() {
    this.dataRows = [];
    this.setState({page: 1, isRefreshing: true}, () => {
      this.fetchData();
    })
  }

  _reachEnd() {
    if (this.state.page == -1 || !this.state.isDataLoaded) {
      return;
    } else {
      this.fetchData();
    }
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View key={"sep_" + rowID} style={styles.rowLine}></View>
    )
  }

  _touchRow(rowData) {
    this.props.navigator.push({
      title: "详情",
      screen: "ProductShowScreen",
      passProps: { data: rowData },
    })
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={this._touchRow.bind(this, rowData)}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{rowData.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 25,
    backgroundColor: '#eee',
  },
  rowTitle: {
    flex: 5,
    fontSize: 16,
    fontWeight: "700",
  },
  rowLine: {
    height: 1,
    backgroundColor: "white",
  },
});
