import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import PhotoItem from "../components/PhotoItem";
import MyButton from "../components/MyButton";

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
      this.setState({ photos: uris });
    }
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.menu}>
          <MyButton
            title="SIATKA/LISTA"
            action={() => {
              this.setState({ numColumns: this.state.numColumns == 4 ? 1 : 4 });
            }}
            style={style.btn}
            textStyle={style.btnText}
          />
          <MyButton
            title="OTWÓRZ CAMERĘ"
            action={() => {}}
            style={style.btn}
            textStyle={style.btnText}
          />
          <MyButton
            title="USUŃ WYBRANE"
            action={() => {}}
            style={style.btn}
            textStyle={style.btnText}
          />
        </View>
        <View style={style.gallery}>
          <FlatList
            numColumns={this.state.numColumns}
            key={this.state.numColumns}
            keyExtractor={(item, index) => item + index}
            data={this.state.photos}
            renderItem={obj => (
              <PhotoItem uri={obj.item} numColumns={this.state.numColumns} />
            )}
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
  menu: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  gallery: {},
  btn: {
    justifyContent: "center",
    height: 50
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Gallery;
