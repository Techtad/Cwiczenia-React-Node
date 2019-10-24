import React, { Component } from "react";
import { View } from "react-native";
import { MapView } from "react-native-maps";

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(View);
    console.log(MapView);
  }

  render() {
    return <View style={style.container}></View>;
  }

  static navigationOptions = {
    title: "Map view",
    headerStyle: {
      backgroundColor: "#1111ee"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

const style = {
  container: {}
};

export default MapScreen;
