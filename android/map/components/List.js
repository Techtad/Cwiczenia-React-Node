import React, { Component } from "react";
import { View, Text } from "react-native";
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import { FlatList } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { AsyncStorage } from "react-native";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, markers: [] };
    this.loadSavedMarkers();
  }

  loadSavedMarkers = async function() {};

  getPosition = async () => {
    let pos = await Location.getCurrentPositionAsync({});
    alert(JSON.stringify(pos, null, 4));
  };

  deleteMarkers = async function() {
    this.setState({ markers: [] });
    await AsyncStorage.clear(error => {
      console.log(error);
    });
  };

  render() {
    return (
      <View style={style.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <MyButton
            action={() => {
              this.getPosition();
            }}
            title="Save current location"
            textStyle={style.buttonText}
            style={{ margin: 10, height: 42 }}
          />
          <MyButton
            action={() => {}}
            title="Delete all saved locations"
            textStyle={style.buttonText}
            style={{ margin: 10, height: 42 }}
          />
        </View>
        <MyButton
          action={() => {
            this.props.navigation.navigate("Map");
          }}
          title="Open the map"
          textStyle={style.buttonText}
          style={{ margin: 10, height: 42 }}
        />
        {this.state.loaded ? (
          <FlatList
            keyExtractor={(item, index) => item + index}
            data={this.state.markers}
            renderItem={item => <ListItem />}
          />
        ) : null}
      </View>
    );
  }

  static navigationOptions = {
    title: "Saved locations",
    headerStyle: {
      backgroundColor: "#1111ee"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

const style = {
  container: {},
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center"
  }
};

export default List;
