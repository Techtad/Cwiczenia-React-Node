import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Alert
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import PhotoItem from "../components/PhotoItem";
import MyButton from "../components/MyButton";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosLoaded: false,
      numColumns: 4,
      photos: [],
      selectedPhotos: []
    };
  }

  componentDidMount() {
    this.loadPhotos();
  }

  async loadPhotos() {
    this.setState({ photosLoaded: false, photos: [], selectedPhotos: [] });
    let album = await MediaLibrary.getAlbumAsync("Camera");
    let obj = await MediaLibrary.getAssetsAsync({
      album: album,
      sortBy: MediaLibrary.SortBy.creationTime,
      first: 1000,
      mediaType: "photo"
    });
    if (obj.assets) {
      let photos = obj.assets.map(a => {
        return { id: a.id, uri: a.uri };
      });
      this.setState({ photosLoaded: true, photos: photos });
    }
  }

  togglePhoto(id) {
    let newSelected = this.state.selectedPhotos;
    if (newSelected.includes(id)) {
      newSelected.splice(newSelected.indexOf(id), 1);
    } else {
      newSelected.push(id);
    }
    this.setState({ selectedPhotos: newSelected });
  }

  deletePhotos() {
    if (this.state.selectedPhotos.length == 0) {
      ToastAndroid.showWithGravity(
        "Zaznacz zdjęcia do usunięcia!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      let count = this.state.selectedPhotos.length;
      Alert.alert(
        "Potwierdzenie",
        `Czy na pewno chcesz usunąć ${count} zdję${
          count == 1 ? "cie" : [2, 3, 4].includes(count) ? "cia" : "ć"
        }?`,
        [
          {
            text: "Tak",
            onPress: async () => {
              await MediaLibrary.deleteAssetsAsync(this.state.selectedPhotos);
              this.loadPhotos();
              ToastAndroid.showWithGravity(
                `Usunięto ${count} zdję${
                  count == 1 ? "cie" : [2, 3, 4].includes(count) ? "cia" : "ć"
                }.`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
          },
          { text: "Nie" }
        ],
        { cancelable: true }
      );
    }
  }

  openBigPhoto(id, uri) {
    this.props.navigation.navigate("BigPhoto", {
      id: id,
      uri: uri,
      reloadGallery: this.loadPhotos.bind(this)
    });
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
            action={() => {
              this.props.navigation.navigate("CameraScreen", {
                reloadGallery: this.loadPhotos.bind(this)
              });
            }}
            style={style.btn}
            textStyle={style.btnText}
          />
          <MyButton
            title="USUŃ WYBRANE"
            action={this.deletePhotos.bind(this)}
            style={style.btn}
            textStyle={style.btnText}
          />
        </View>
        <View style={style.gallery}>
          {this.state.photosLoaded ? (
            <FlatList
              numColumns={this.state.numColumns}
              key={this.state.numColumns}
              keyExtractor={(item, index) => item + index}
              data={this.state.photos}
              renderItem={obj => (
                <PhotoItem
                  uri={obj.item.uri}
                  id={obj.item.id}
                  numColumns={this.state.numColumns}
                  toggleFunc={this.togglePhoto.bind(this)}
                  bigPhotoFunc={this.openBigPhoto.bind(this)}
                  wasSelected={this.state.selectedPhotos.includes(obj.item.id)}
                />
              )}
            />
          ) : (
            <Text>Ładowanie zdjęć...</Text>
          )}
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
