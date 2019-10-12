import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: this.props.bgColor
        }}
        onPress={this.props.pressFunc}
      >
        <Text style={{ alignSelf: "center", color: "white", fontSize: 48 }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
