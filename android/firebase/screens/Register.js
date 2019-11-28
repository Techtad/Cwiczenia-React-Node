import React, { Component } from "react";
import { View, Text, BackHandler, TextInput } from "react-native";
import Colors from "../constants/Colors";
import MyButton from "../components/MyButton";
import firebase from "firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inEmail: "",
      inPassword: "",
      errorMessage: ""
    };
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
    this.props.navigation.state.params.checkAuth();
    this.props.navigation.navigate("Authorization");
    return true;
  };

  register() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.inEmail, this.state.inPassword)
      .then(() => this.props.navigation.navigate("Authorization"))
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          <TextInput
            value={this.state.inEmail}
            onChangeText={txt => {
              this.setState({ inEmail: txt });
            }}
            placeholder="email"
            textContentType="emailAddress"
          />
          <TextInput
            value={this.state.inPassword}
            onChangeText={txt => {
              this.setState({ inPassword: txt });
            }}
            placeholder="hasło"
            textContentType="password"
            secureTextEntry={true}
          />
          <MyButton title="Zarejestruj się" action={this.register.bind(this)} />
          <MyButton
            title="Logowanie"
            action={() => {
              this.props.navigation.navigate("Login", {
                checkAuth: this.props.navigation.state.params.checkAuth
              });
            }}
          />
        </View>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Rejestracja",
      headerStyle: {
        backgroundColor: Colors.tintColor
      },
      headerTitleStyle: {
        color: "white"
      },
      headerLeft: (
        <MyButton
          title="←"
          style={{ width: 72, justifyContent: "center", top: -12 }}
          textStyle={{ fontSize: 42, fontWeight: "bold", alignSelf: "center" }}
          action={() => {
            navigation.state.params.checkAuth();
            navigation.navigate("Authorization", {
              checkAuth: navigation.state.params.checkAuth
            });
          }}
        />
      )
    };
  };
}

export default Register;
