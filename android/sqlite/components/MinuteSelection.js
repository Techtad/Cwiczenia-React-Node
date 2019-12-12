import React, { Component } from "react";
import Button from "./Button";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

var styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    position: "relative",
    //borderWidth: 2,
    borderColor: "black",
    flex: 1,
    minWidth: Dimensions.get("window").width,
    minHeight: Dimensions.get("window").width
  }
});

function twoDigiNumString(num) {
  return num < 10 ? "0" + num.toString() : num.toString();
}

class MinuteSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fivesButtons = [];
    this.onesButtons = [];
    for (let i = 0; i <= 59; i++) {
      if (i % 5 == 0) this.fivesButtons.push(twoDigiNumString(i));
      else this.onesButtons.push(twoDigiNumString(i));
    }
  }

  render() {
    let btnDim = Dimensions.get("window").width / 8;
    let onesDim = btnDim / 2;
    let center = Dimensions.get("window").width / 2;
    let radiusFives = (Dimensions.get("window").width / 8) * 3 + btnDim / 2;
    let radiusOnes = (Dimensions.get("window").width / 8) * 2 + btnDim;
    return (
      <View style={styles.container}>
        {this.fivesButtons.map((num, index) => {
          let angle = ((index - 3) * Math.PI) / 6;
          return (
            <Button
              key={index + Math.random()}
              val={num}
              h={this.props.displayH}
              onPress={this.props.minuteSelectFunc}
              style={{
                width: btnDim,
                height: btnDim,
                backgroundColor:
                  this.props.selectedMinute == num ? "red" : Colors.tintColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: btnDim / 2,
                position: "absolute",
                left: center - btnDim / 2 + radiusFives * Math.cos(angle),
                top: center - btnDim / 2 + radiusFives * Math.sin(angle)
              }}
            >
              <Text>{num}</Text>
            </Button>
          );
        })}
        {this.onesButtons.map((num, index) => {
          let angle = ((index - 11) * Math.PI) / 24;
          return (
            <Button
              key={index + Math.random()}
              val={num}
              h={this.props.displayH}
              onPress={this.props.minuteSelectFunc}
              style={{
                width: onesDim,
                height: onesDim,
                backgroundColor:
                  this.props.selectedMinute == num ? "red" : "yellow",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: onesDim / 2,
                position: "absolute",
                left: center - onesDim / 2 + radiusOnes * Math.cos(angle),
                top: center - onesDim / 2 + radiusOnes * Math.sin(angle)
              }}
            >
              <Text>{num}</Text>
            </Button>
          );
        })}
      </View>
    );
  }
}

export default MinuteSelection;
