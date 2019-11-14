import React, { Component } from "react";
import { View, Text } from "react-native";

class StationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> {this.props.name} </Text>
        <Text> {this.props.longitude} </Text>
        <Text> {this.props.latitude} </Text>
      </View>
    );
  }
}

export default StationInfo;
