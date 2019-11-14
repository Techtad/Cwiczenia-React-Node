import React, { Component } from "react";
import {
  Alert,
  ImageBackground,
  BackHandler,
  ToastAndroid
} from "react-native";
import MyButton from "../components/MyButton";
import * as MediaLibrary from "expo-media-library";

class BigPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButtonPressed);
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

  async deleteAndReturn() {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz usunąć to zdjęcie?",
      [
        {
          text: "Tak",
          onPress: async () => {
            await MediaLibrary.deleteAssetsAsync([
              this.props.navigation.state.params.id
            ]);
            ToastAndroid.showWithGravity(
              "Usunięto zdjęcie.",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            this.props.navigation.state.params.reloadGallery();
            this.props.navigation.goBack();
          }
        },
        { text: "Nie" }
      ],
      { cancelable: true }
    );
  }

  render() {
    return (
      <ImageBackground
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "flex-end"
        }}
        source={{ uri: this.props.navigation.state.params.uri }}
      >
        <MyButton
          title="USUŃ"
          style={{
            width: 140,
            height: 50,
            backgroundColor: "white",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 25,
            borderWidth: 3,
            borderColor: "red"
          }}
          textStyle={{ color: "red", alignSelf: "center" }}
          action={this.deleteAndReturn.bind(this)}
        />
      </ImageBackground>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Podgląd zdjęcia",
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

export default BigPhoto;
