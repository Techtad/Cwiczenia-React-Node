import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import ImageButton from "../components/ImageButton";
import HourSelection from "../components/HourSelection";
import MinuteSelection from "../components/MinuteSelection";
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
  }

  hourSelectFunc(sender) {
    this.setState({ hour: sender.props.val });
  }

  minuteSelectFunc(sender) {
    this.setState({ minute: sender.props.val });
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
            marginTop: 64,

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
        {this.state.hourSelected ? (
          <HourSelection
            hourSelectFunc={this.hourSelectFunc.bind(this)}
            selectedHour={this.state.hour}
          />
        ) : (
          <MinuteSelection
            minuteSelectFunc={this.minuteSelectFunc.bind(this)}
            selectedMinute={this.state.minute}
          />
        )}
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
              this.state.hour + ":" + this.state.minute,
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
