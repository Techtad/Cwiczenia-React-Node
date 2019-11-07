import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Switch } from "react-native-gesture-handler";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Image
          style={style.img}
          source={require("../assets/marker_icon.png")}
        />
        <View>
          <Text style={style.timestamp}>timestamp: {this.props.timestamp}</Text>
          <Text> longitude: {this.props.longitude} </Text>
          <Text> latitude: {this.props.latitude} </Text>
        </View>
        <Switch
          value={this.props.selected}
          onValueChange={value => {
            this.props.selectFunc(this.props.index, value);
          }}
        />
      </View>
    );
  }
}

const style = {
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10
  },
  timestamp: {
    fontWeight: "bold"
  },
  img: {
    width: 64,
    height: 64
  }
};

export default ListItem;
