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
          backgroundColor: this.props.color,
          height: this.props.height,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white", fontSize: 36 }}>
          {" "}
          {this.props.text}{" "}
        </Text>
      </View>
    );
  }
}

export default Item;
