import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(event) {
    console.log(event);
    alert("id = " + this.props.text + "\nbg = " + this.props.bgColor);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onClick.bind(this)}
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
      </TouchableOpacity>
    );
  }
}

export default Item;
