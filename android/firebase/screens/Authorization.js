import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";
import Colors from "../constants/Colors";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAX21SYCjFlrM6J5LRuGptmIaOoFexdjZI",
  authDomain: "kantor4ib1.firebaseapp.com",
  databaseURL: "https://kantor4ib1.firebaseio.com",
  projectId: "kantor4ib1",
  storageBucket: "kantor4ib1.appspot.com",
  messagingSenderId: "314259541111",
  appId: "1:314259541111:web:8373c1f1bf85ba43664a72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkAuth() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Stations", {
          checkAuth: this.checkAuth.bind(this),
          userEmail: user.email
        });
      } else {
        this.props.navigation.navigate("Login", {
          checkAuth: this.checkAuth.bind(this)
        });
      }
      // jeśli user istnieje, wtedy przechodzimy do wyświetlenia ekranu z listą danych pobranych z bazy firebase
      // jeśli nie istnieje - wtedy przechodzimy do ekranu logowania
    });
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
      </View>
    );
  }

  static navigationOptions = {
    title: "Autoryzowanie...",
    headerStyle: {
      backgroundColor: Colors.tintColor
    },
    headerTitleStyle: {
      color: "white"
    },
    headerLeft: null
  };
}

export default Authorization;
