import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let photoWidth = Dimensions.get("window").width / this.props.numColumns;
    let photoHeight = this.props.numColumns == 4 ? photoWidth : 100;

    return (
      <View
        style={{
          width: photoWidth,
          height: photoHeight,
          justifyContent: "center"
        }}
      >
        <Image
          style={{ width: "90%", height: "90%", alignSelf: "center" }}
          source={{ uri: this.props.uri }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({});

export default PhotoItem;
