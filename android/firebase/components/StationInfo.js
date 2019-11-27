import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class StationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Text> {this.props.name} </Text>
        <Text> {this.props.longitude} </Text>
        <Text> {this.props.latitude} </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderColor: "black"
  }
});

export default StationInfo;
