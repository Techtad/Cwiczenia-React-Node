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
  if (num == 24) return "00";
  return num < 10 ? "0" + num.toString() : num.toString();
}

class HourSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.outerButtons = [];
    for (let i = 1; i <= 12; i++) this.outerButtons.push(twoDigiNumString(i));
    this.innerButtons = [];
    for (let i = 13; i <= 24; i++) this.innerButtons.push(twoDigiNumString(i));
  }

  render() {
    let btnDim = Dimensions.get("window").width / 8;
    let center = Dimensions.get("window").width / 2;
    let outerRadius = (Dimensions.get("window").width / 8) * 3 + btnDim / 4;
    let innerRadius = Dimensions.get("window").width / 4;
    return (
      <View style={styles.container}>
        {this.outerButtons.map((num, index) => {
          let angle = ((index - 2) * Math.PI) / 6;
          return (
            <Button
              key={index + Math.random()}
              val={num}
              h={this.props.displayH}
              onPress={this.props.hourSelectFunc}
              style={{
                width: btnDim,
                height: btnDim,
                backgroundColor:
                  this.props.selectedHour == num ? "red" : Colors.tintColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: btnDim / 2,
                position: "absolute",
                left: center - btnDim / 2 + outerRadius * Math.cos(angle),
                top: center - btnDim / 2 + outerRadius * Math.sin(angle)
              }}
            >
              <Text>{num}</Text>
            </Button>
          );
        })}
        {this.innerButtons.map((num, index) => {
          let angle = ((index - 2) * Math.PI) / 6;
          return (
            <Button
              key={index + Math.random()}
              val={num}
              h={this.props.displayH}
              onPress={this.props.hourSelectFunc}
              style={{
                width: btnDim,
                height: btnDim,
                backgroundColor:
                  this.props.selectedHour == num ? "red" : "yellow",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: btnDim / 2,
                position: "absolute",
                left: center - btnDim / 2 + innerRadius * Math.cos(angle),
                top: center - btnDim / 2 + innerRadius * Math.sin(angle)
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

export default HourSelection;
