import React, { Component } from "react";
import { View, Text, BackHandler, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import MyButton from "../components/MyButton";
import StationInfo from "../components/StationInfo";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = { dataLoaded: false, data: [] };
    this.stations = this.getFirebase().child("stations");
  }

  getFirebase() {
    return firebase.database().ref();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButtonPressed);
    this.stations.on("value", elements => {
      //console.log(elements);
      let data = [];
      elements.forEach(el => {
        console.log(el["latitude"]);
        data.push({
          name: el.stationName,
          latitude: el.latitude,
          longitude: el.longitude
        });
      });
      this.setState({
        data: data,
        dataLoaded: true
      });
    });
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

  render() {
    return (
      <View style={{}}>
        <View style={{ alignSelf: "center" }}>
          <Text>
            {`Witaj ${this.props.navigation.state.params.userEmail}!`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <MyButton
              title="Menu główne"
              action={() => {
                this.props.navigation.navigate("Main");
              }}
            />
            <MyButton
              title="Wyloguj"
              action={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => this.props.navigation.navigate("Authorization"))
                  .catch(error => alert(error));
              }}
            />
          </View>
          {this.state.dataLoaded ? (
            <FlatList
              keyExtractor={(item, index) => item + index}
              data={this.state.data}
              renderItem={o => (
                <StationInfo
                  name={o.item.name}
                  latitude={o.item.latitude}
                  longitude={o.item.longitude}
                />
              )}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Stacje rowerowe",
      headerStyle: {
        backgroundColor: Colors.tintColor
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
            navigation.state.params.checkAuth();
            navigation.navigate("Authorization");
          }}
        />
      )
    };
  };
}

export default Stations;
