import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View
} from "react-native";

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.wasSelected
    };
  }

  render() {
    let photoWidth = Dimensions.get("window").width / this.props.numColumns;
    let photoHeight = this.props.numColumns == 4 ? photoWidth : 128;

    return (
      <TouchableOpacity
        style={{
          width: photoWidth,
          height: photoHeight,
          justifyContent: "center"
        }}
        onPress={() => {
          this.setState({ selected: !this.state.selected });
          this.props.toggleFunc(this.props.id);
        }}
        onLongPress={() => {
          this.props.bigPhotoFunc(this.props.id, this.props.uri);
        }}
      >
        <Image
          style={{
            width: this.state.selected ? "81%" : "99%",
            height: this.state.selected ? "81%" : "99%",
            alignSelf: "center"
          }}
          source={{ uri: this.props.uri }}
        />
        <Text
          style={{ position: "absolute", bottom: 3, right: 3, color: "white" }}
        >
          {this.props.id}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            opacity: this.state.selected ? 0.25 : 0
          }}
        />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({});

export default PhotoItem;
