import React, { Component } from "react";
import { View, Text, Image } from "react-native";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Image source={require("../assets/avatar.png")} style={style.img} />
        <Text style={style.txt}>
          {" "}
          {this.props.navigation.state.params.username}{" "}
        </Text>
        <Text style={style.txt}>
          {" "}
          {this.props.navigation.state.params.password}{" "}
        </Text>
      </View>
    );
  }

  static navigationOptions = {
    title: "edit page",
    headerStyle: {
      backgroundColor: "#4caf50"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

const style = {
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "100%"
  },
  img: {},
  txt: {
    fontSize: 36
  }
};

export default EditUser;
