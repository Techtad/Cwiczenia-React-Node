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
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: this.props.textColor,
            fontSize: 36,
            alignSelf: "center"
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export default Item;
