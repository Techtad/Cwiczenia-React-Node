import React, { Component } from "react";
import { View, Text } from "react-native";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style}>
        <Text> {this.props.text} </Text>
      </View>
    );
  }
}

const style = {};

export default Button;
