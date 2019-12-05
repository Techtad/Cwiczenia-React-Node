import React, { Component } from "react";
import { View, Text } from "react-native";
import ImageButton from "../components/ImageButton";
import Database from "../Database";

class NewAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column-reverse",
          alignItems: "center"
        }}
      >
        <ImageButton
          style={{
            backgroundColor: "red",
            width: 60,
            height: 60,
            padding: 10,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            marginBottom: 30
          }}
          src={require("../assets/images/add.png")}
          imgStyle={{ alignSelf: "center" }}
          action={() => {
            Database.addAlarm("00:00", []);
            this.props.navigation.state.params.reload();
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }

  static navigationOptions = {
    header: null
  };
}

export default NewAlarm;
