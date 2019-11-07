import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import PhotoItem from "../components/PhotoItem";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { numColumns: 4, photos: [] };
  }

  componentDidMount() {
    this.loadPhotos();
  }

  async loadPhotos() {
    let obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo" // typ pobieranych danych, photo jest domyślne
    });
    if (obj.assets) {
      let uris = obj.assets.map(a => {
        return a.uri;
      });
      //alert(JSON.stringify(uris));
      this.setState({ photos: uris });
    }
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.menu}></View>
        <View style={style.gallery}>
          <FlatList
            numColumns={this.state.numColumns}
            key={this.state.numColumns}
            keyExtractor={(item, index) => item + index}
            data={this.state.photos}
            renderItem={obj => <PhotoItem uri={obj.item} />}
          />
        </View>
      </View>
    );
  }

  static navigationOptions = {
    title: "Galeria zdjęć",
    headerStyle: {
      backgroundColor: "red"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

const style = StyleSheet.create({
  container: {},
  menu: {},
  gallery: {}
});

export default Gallery;
