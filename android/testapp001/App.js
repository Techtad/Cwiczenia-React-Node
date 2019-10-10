import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Item from "./app5/components/Item";

export default class App extends React.Component {
  render() {
    cols = [];
    row = [];

    colors.map((el, i) => {
      row.push(<Item key={i} text={i + 1} bgColor={el} textColor="white" />);
    });
    for (let i = 0; i < 6; i++) {
      cols.push(
        <View key={i} style={styles.column}>
          {i % 2 == 1 ? row : row.slice().reverse()}
        </View>
      );
    }

    return <View style={styles.container}>{cols}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 1,
    flexDirection: "column"
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
