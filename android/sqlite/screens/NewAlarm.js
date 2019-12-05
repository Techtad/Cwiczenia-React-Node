import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import ImageButton from "../components/ImageButton";
import TextButton from "../components/TextButton";
import Database from "../Database";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

var dims = Dimensions.get("window");

class NewAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "00",
      minute: "00",
      hourSelected: true
    };

    this.hourBtns = [];
    this.minuteBtns = [];
  }

  componentWillMount() {
    let center = { x: dims.width / 2, y: dims.height / 2 };
    let radius = 50;
    for (let i = 0; i < 12; i++) {
      let angle = ((Math.PI * 2) / 12) * i;
      this.hourBtns.push(
        <TextButton
          key={i}
          style={{
            fontSize: 32,
            backgroundColor: Colors.tintColor,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            left: Math.cos(angle) * 50,
            top: Math.sin(angle) * 50
          }}
          onLayout={event => {
            var { x, y, width, height } = event.nativeEvent.layout;
            console.log(x, y, width, height);
          }}
          action={() => {
            alert(i);
          }}
          title={i.toString()}
        />
      );
    }
  }

  render() {
    return (
      <View
        style={{
          width: dims.width,
          height: dims.height,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: "100%",
            marginTop: 100,

            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,1)",
              true
            )}
            onPress={() => {
              this.setState({ hourSelected: true });
            }}
          >
            <Text
              style={{
                fontSize: 64,
                color: this.state.hourSelected ? "red" : "black"
              }}
            >
              {this.state.hour}
            </Text>
          </TouchableNativeFeedback>
          <Text style={{ fontSize: 64 }}>:</Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,1)",
              true
            )}
            onPress={() => {
              this.setState({ hourSelected: false });
            }}
          >
            <Text
              style={{
                fontSize: 64,
                color: this.state.hourSelected ? "black" : "red"
              }}
            >
              {this.state.minute}
            </Text>
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            width: 600,
            height: 600,
            position: "relative",
            borderWidth: 1,
            borderColor: "black"
          }}
        >
          {this.hourBtns}
        </View>
        <ImageButton
          style={{
            backgroundColor: "red",
            width: 80,
            height: 80,
            padding: 10,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 30
          }}
          src={require("../assets/images/add.png")}
          imgStyle={{ alignSelf: "center" }}
          action={() => {
            Database.addAlarm(
              "00:00",
              [false, false, false, false, false, false, false],
              false
            );
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
