import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let photoWidth = Dimensions.get("window").width / this.props.numColumns;
    let photoHeight =
      this.props.numColumns == 4
        ? Dimensions.get("window").width / this.props.numColumns
        : 100;

    return (
      <View style={{ width: photoWidth, height: photoHeight }}>
        <Text> {this.props.uri} </Text>
        <Image source={{ uri: this.props.uri }} />
      </View>
    );
  }
}

const style = StyleSheet.create({});

export default PhotoItem;
