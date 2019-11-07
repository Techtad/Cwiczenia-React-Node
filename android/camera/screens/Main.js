import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import MyButton from "../components/MyButton";
import Colors from "../constants/Colors";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { hasPermissions: false };
  }

  componentWillMount = async () => {
    this.setPermissions();
  };

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasPermissions: status == "granted" });
  };

  render() {
    if (this.state.hasPermissions) {
      return (
        <View style={style.container}>
          <View style={style.header}>
            <Text style={style.title}>Camera App</Text>
          </View>
          <View style={style.section}>
            <MyButton
              title="START"
              action={() => {
                this.props.navigation.navigate("Gallery");
              }}
              style={style.button}
              textStyle={{ textAlign: "center", color: "white" }}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            flex: 1,
            alignItems: "center"
          }}
        >
          <Text style={{ flex: 1, alignSelf: "center" }}>
            Aplikacja ta nie może działać bez uprawnień dostępu do aparatu
            fotograficznego telefonu.
          </Text>
        </View>
      );
    }
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
    backgroundColor: Colors.mainHeader,
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
    backgroundColor: "red"
  }
});

export default Main;
