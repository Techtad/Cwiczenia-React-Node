import React, { Component } from "react";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import MyButton from "./MyButton";
import * as Permissions from "expo-permissions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { fontloaded: false };
  }

  componentWillMount = async () => {
    this.setPermissions();

    await Font.loadAsync({
      go3v2: require("../assets/fonts/go3v2.ttf")
    });
    this.setState({ fontloaded: true });
  };

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("odmawiam przydzielenia uprawnień do czytania lokalizacji");
    }
  };

  render() {
    return (
      <View style={{ height: "100%" }}>
        <View style={style.header}>
          {this.state.fontloaded ? (
            <View>
              <Text style={style.title}>GeoMap App</Text>
              <Text style={style.subtitle}>find and save your location</Text>
            </View>
          ) : null}
        </View>
        <View>
          <MyButton
            title="START"
            style={{ alignSelf: "center" }}
            textStyle={{
              fontWeight: "bold",
              fontSize: 42
            }}
            action={() => {
              this.props.navigation.navigate("List");
            }}
          />
        </View>
      </View>
    );
  }

  static navigationOptions = {
    header: null
  };
}

const style = {
  header: {
    backgroundColor: "#1111ee",
    height: "50%",
    justifyContent: "center"
  },
  title: {
    color: "#ffffff",
    alignSelf: "center",
    fontFamily: "go3v2",
    fontSize: 48
  },
  subtitle: {
    color: "#ffffff",
    alignSelf: "center",
    fontFamily: "go3v2",
    fontSize: 24
  },
  content: {
    justifyContent: "center"
  }
};

export default Main;
