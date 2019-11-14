import React, { Component } from "react";
import { View, Text, ToastAndroid, BackHandler } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import MyButton from "../components/MyButton";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButtonPressed);
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status == "granted" });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.backButtonPressed
    );
  }

  backButtonPressed = () => {
    this.props.navigation.state.params.reloadGallery();
    this.props.navigation.goBack();
    return true;
  };

  switchCamera() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

  async takePhoto() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(photo.uri);
      let album = await MediaLibrary.getAlbumAsync("Camera");
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      ToastAndroid.showWithGravity(
        "Wykonano zdjęcie.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  cameraSettings() {
    ToastAndroid.showWithGravity(
      "Funkcja jeszcze nie dostępna.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  render() {
    if (this.state.hasCameraPermission == null) {
      return <View />;
    } else if (this.state.hasCameraPermission == false) {
      return <Text>Brak dostępu do kamery.</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 25,
                  alignItems: "center"
                }}
              >
                <MyButton
                  title="&#10226;"
                  textStyle={{
                    color: "red",
                    alignSelf: "center",
                    fontSize: 48
                  }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  action={this.switchCamera.bind(this)}
                />
                <MyButton
                  title="&#128247;"
                  textStyle={{
                    color: "red",
                    alignSelf: "center",
                    fontSize: 64
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 25,
                    marginRight: 25
                  }}
                  action={this.takePhoto.bind(this)}
                />
                <MyButton
                  title="&#9881;"
                  textStyle={{
                    color: "red",
                    alignSelf: "center",
                    fontSize: 48
                  }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  action={this.cameraSettings.bind(this)}
                />
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Kamera",
      headerStyle: {
        backgroundColor: "red"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerLeft: (
        <MyButton
          title="←"
          style={{ width: 72, justifyContent: "center" }}
          textStyle={{ fontSize: 42, fontWeight: "bold", alignSelf: "center" }}
          action={() => {
            navigation.state.params.reloadGallery();
            navigation.goBack();
          }}
        />
      )
    };
  };
}

export default CameraScreen;
