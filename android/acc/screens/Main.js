import React, { Component } from "react";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";
import { Accelerometer } from "expo-sensors";
import TextButton from "../components/TextButton";

const ws = new WebSocket("ws://192.168.0.143:1337");
var ControllerId = -1;

//wysłanie danych na serwer przy podłączeniu klienta do serwera

ws.onopen = () => {
  ws.send(JSON.stringify({ action: "registerController" }));
};

//odebranie danych z serwera i reakcja na nie, po sekundzie

ws.onmessage = e => {
  let data = JSON.parse(e.data);
  if (data.ControllerId != undefined) ControllerId = data.ControllerId;
  /* setTimeout(function() {
    ws.send("timestamp z klienta: " + Date.now());
  }, 1000); */
};

ws.onerror = e => {
  console.log(e.message);
};

ws.onclose = e => {
  console.log(e.code, e.reason);
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { listeing: false, sending: false, x: 0, y: 0, z: 0 };
  }

  update(data) {
    this.setState(data);
    if (this.state.sending)
      ws.send(
        JSON.stringify({
          action: "accdata",
          controller: ControllerId,
          x: this.state.x,
          y: this.state.y,
          z: this.state.z
        })
      );
  }

  toggleListening() {
    if (this.state.listeing) {
      Accelerometer.removeAllListeners();
      this.setState({ listeing: false });
    } else {
      Accelerometer.addListener(this.update.bind(this));
      this.setState({ listeing: true });
    }
  }

  toggleSending() {
    this.setState({ sending: !this.state.sending });
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <TextButton
          title={this.state.listeing ? "ON" : "OFF"}
          action={this.toggleListening.bind(this)}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            width: 128,
            height: 64,
            backgroundColor: this.state.listeing ? "green" : "red"
          }}
          textStyle={{ textAlign: "center", color: "white" }}
        />
        <View>
          <Text>X: {this.state.x}</Text>
          <Text>Y: {this.state.y}</Text>
          <Text>Z: {this.state.z}</Text>
        </View>
        <TextButton
          title={this.state.sending ? "SENDING" : "NOT SENDING"}
          action={this.toggleSending.bind(this)}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            width: 128,
            height: 64,
            backgroundColor: this.state.sending ? "green" : "red"
          }}
          textStyle={{ textAlign: "center", color: "white" }}
        />
        <TextButton
          title="FIRE"
          action={() => {
            if (this.state.sending)
              ws.send(
                JSON.stringify({
                  action: "accdata",
                  controller: ControllerId,
                  x: this.state.x,
                  y: this.state.y,
                  z: this.state.z,
                  fire: true
                })
              );
          }}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            width: 128,
            height: 64,
            backgroundColor: "red"
          }}
          textStyle={{ textAlign: "center", color: "white" }}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: "Akcelerometr",
    headerStyle: {
      backgroundColor: Colors.tintColor
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

export default Main;
