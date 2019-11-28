import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  ActivityIndicator,
  YellowBox
} from "react-native";
import Colors from "../constants/Colors";
import MyButton from "../components/MyButton";
import StationInfo from "../components/StationInfo";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
console.ignoredYellowBox = ["Setting a timer"];

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
      elements.val().forEach(el => {
        data.push({
          name: el.stationName,
          latitude: el.latitude,
          longitude: el.longitude,
          availableBikes: el.availableBikes,
          totalDocks: el.totalDocks,
          statusValue: el.statusValue
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
      <View style={{ width: "100%", padding: 0 }}>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: "blue" }}>
            {`Witaj ${this.props.navigation.state.params.userEmail}!`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <MyButton
              style={{ margin: 10 }}
              textStyle={{ fontSize: 18 }}
              title="Menu główne"
              action={() => {
                this.props.navigation.navigate("Main");
              }}
            />
            <MyButton
              style={{ margin: 10 }}
              textStyle={{ fontSize: 18 }}
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
        </View>
        <View>
          {this.state.dataLoaded ? (
            <FlatList
              style={{ width: "99%", alignSelf: "center" }}
              keyExtractor={(item, index) => item + index}
              data={this.state.data}
              renderItem={o => (
                <StationInfo
                  name={o.item.name}
                  latitude={o.item.latitude}
                  longitude={o.item.longitude}
                  availableBikes={o.item.availableBikes}
                  totalDocks={o.item.totalDocks}
                  statusValue={o.item.statusValue}
                  navigation={this.props.navigation}
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
          style={{ width: 72, justifyContent: "center", top: -12 }}
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
