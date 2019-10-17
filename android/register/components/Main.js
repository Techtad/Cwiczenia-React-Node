import React, { Component } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyButton from "./MyButton";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { inUsername: "", inPassword: "" };
  }

  tryRegister() {
    fetch("localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.inUsername,
        password: this.state.inPassword
      })
    }).then(resp => {
      alert(resp);
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="username"
          onChangeText={txt => {
            this.setState({ inUsername: txt });
          }}
          value={this.state.inUsername}
        ></TextInput>
        <TextInput
          placeholder="password"
          onChangeText={txt => {
            this.setState({ inPassword: txt });
          }}
          value={this.state.inPassword}
        ></TextInput>
        <MyButton
          title="register"
          action={this.tryRegister.bind(this)}
          style={{}}
        />
      </View>
    );
  }

  static navigationOptions = {
    // header: null,
    title: "Register Node App",
    headerStyle: {
      backgroundColor: "#22bb22",
      height: 320
    },
    headerTitleStyle: {
      color: "#ffffff",
      fontSize: 56
    }
  };
}

export default Main;
