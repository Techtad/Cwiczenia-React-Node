import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Item from "./app3/components/Item";

export default class App extends React.Component {
  render() {
    leftCol = [];
    rightCol = [];
    colors.map((el, i) => {
      leftCol.push(
        <Item key={i} text={"Item " + (i + 1)} bgColor={el} textColor="white" />
      );
    });
    colors.reverse().map((el, i) => {
      rightCol.push(
        <Item key={i} text={"Item " + (i + 1)} bgColor={el} textColor="black" />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.column}>{leftCol}</View>
        <View style={styles.column}>{rightCol}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flexDirection: "column",
    width: "50%"
  }
});

const colors = [
  "#ff0000",
  "#009900",
  "#2222ff",
  "#ffaa00",
  "#ffaadd",
  "#aaaaaa"
];
