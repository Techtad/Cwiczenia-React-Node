import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MyButton from "../components/MyButton";
import Colors from "../constants/Colors";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = async () => {};

  render() {
    return (
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>Firebase App</Text>
        </View>
        <View style={style.section}>
          <MyButton
            title="START"
            action={() => {
              this.props.navigation.navigate("Authorization");
            }}
            style={style.button}
            textStyle={{ textAlign: "center", color: "white" }}
          />
        </View>
      </View>
    );
  }

  static navigationOptions = {
    header: null
  };
}

const style = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  header: {
    height: "50%",
    backgroundColor: Colors.tintColor,
    justifyContent: "center"
  },
  title: {
    alignSelf: "center",
    color: "white",
    fontSize: 64
  },
  section: {
    height: "50%",
    justifyContent: "center"
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    width: 128,
    height: 64,
    backgroundColor: Colors.tintColor
  }
});

export default Main;
