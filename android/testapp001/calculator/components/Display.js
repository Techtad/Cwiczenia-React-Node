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
        <Text
          style={{
            color: "darkgray",
            fontSize: 48,
            alignSelf: "flex-end",
            marginLeft: 10,
            marginRight: 5
          }}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {this.props.previousEquation}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 48,
            alignSelf: "flex-end",
            marginLeft: 10,
            marginRight: 5
          }}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {this.props.currentEquation}
        </Text>
      </View>
    );
  }
}

const style = {
  backgroundColor: "#47ffcc",
  height: `${100 / 3}%`,
  justifyContent: "center"
};

export default Display;
