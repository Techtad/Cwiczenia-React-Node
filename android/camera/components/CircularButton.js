import MyButton from "./MyButton";
import React, { Component, StyleSheet } from "react";
import { View, Text } from "react-native";

class CircularButton extends MyButton {
  constructor(props) {
    props.style = style;
    super(props);
    this.state = {};
  }

  render() {
    return super.render();
  }
}

const style = StyleSheet.create({});

export default CircularButton;
