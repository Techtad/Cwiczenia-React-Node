import React, { Component } from "react";
import { KeyboardAvoidingView, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyButton from "./MyButton";
import Settings from "./Settings";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { inUsername: "", inPassword: "" };
  }

  tryRegister() {
    fetch(Settings.serverAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "register",
        username: this.state.inUsername,
        password: this.state.inPassword
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(respJson => {
        if (respJson.success) {
          fetch(Settings.serverAddress)
            .then(resp => {
              return resp.json();
            })
            .then(respJson => {
              this.props.navigation.navigate("Users", { users: respJson });
            });
        } else {
          alert(respJson.reason);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            backgroundColor: "#4caf50",
            height: 420,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 36,
              alignSelf: "center"
            }}
          >
            Register Node App
          </Text>
        </View>
        <KeyboardAvoidingView>
          <Text>username</Text>
          <TextInput
            placeholder="username"
            onChangeText={txt => {
              this.setState({ inUsername: txt });
            }}
            textContentType={"username"}
            value={this.state.inUsername}
            style={{
              fontSize: 18
            }}
          ></TextInput>
          <Text>password</Text>
          <TextInput
            placeholder="password"
            onChangeText={txt => {
              this.setState({ inPassword: txt });
            }}
            secureTextEntry={true}
            textContentType={"password"}
            value={this.state.inPassword}
            style={{
              fontSize: 18
            }}
          ></TextInput>
          <MyButton
            title="register"
            action={this.tryRegister.bind(this)}
            style={{
              alignSelf: "center"
            }}
            textStyle={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 18
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  static navigationOptions = {
    header: null
  };
}

export default Main;
