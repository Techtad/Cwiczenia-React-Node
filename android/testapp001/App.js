import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Display from "./calculator/components/Display";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Display text="" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 1,
    flexDirection: "column"
  }
});
