import React, { Component } from "react";
import { View, Text } from "react-native";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.bgColor,
          height: this.props.height
        }}
      >
        <Text style={{ fontSize: 48 }}> {this.props.text} </Text>
      </View>
    );
  }
}

export default Item;
