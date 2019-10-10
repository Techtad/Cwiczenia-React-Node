import React, { Component } from "react";
import { View, Text } from "react-native";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style}>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

const style = {
  backgroundColor: "#00bbbb",
  height: 100 / 3 + "%"
};

export default Display;
