import React, { Component } from "react";
import { View, Text } from "react-native";
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import { FlatList } from "react-native-gesture-handler";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <MyButton
            action={() => {}}
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
        <FlatList
          keyExtractor={(item, index) => item + index}
          data={this.state.markers}
          renderItem={item => <ListItem />}
        />
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
