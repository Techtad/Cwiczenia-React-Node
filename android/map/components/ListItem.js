import React, { Component } from "react";
import { View, Text } from "react-native";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Text> ListItem </Text>
      </View>
    );
  }
}

const style = {
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
};

export default ListItem;
