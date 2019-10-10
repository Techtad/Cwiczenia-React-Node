import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Item from "./app1/components/Item";

export default class App extends React.Component {
  render() {
    console.log("App"); // tą konsolę zobacz w przeglądarce
    return (
      <View style={styles.container}>
        <Item text="Header" bgColor="#ff0000" height="20%" />
        <Item text="Content" bgColor="#00ff00" height="60%" />
        <Item text="Footer" bgColor="#0000ff" height="20%" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff00"
  }
});
