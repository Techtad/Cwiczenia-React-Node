import React, { Component } from "react";
import { View, Text } from "react-native";
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import { FlatList, Switch } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { AsyncStorage, ActivityIndicator } from "react-native";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, markers: [], waiting: false };
    this.loadSavedMarkers();
  }

  loadSavedMarkers = async function() {
    let data = await AsyncStorage.getItem("markers");
    let markers = data ? JSON.parse(data) : [];
    this.setState({ loaded: true, markers: markers, allSelected: false });
  };

  savePosition = async () => {
    this.setState({ waiting: true });
    let pos = await Location.getCurrentPositionAsync({});
    //alert(JSON.stringify(pos, null, 4));
    if (pos.coords.longitude && pos.coords.latitude) {
      let newMarkers = this.state.markers.slice();
      newMarkers.push({
        timestamp: pos.timestamp,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
        title: "Marker #" + (newMarkers.length + 1),
        selected: false
      });
      this.setState({ markers: newMarkers, waiting: false });
      AsyncStorage.setItem("markers", JSON.stringify(newMarkers));
    } else {
      alert(JSON.stringify(pos, null, 4));
    }
  };

  deleteMarkers = async function() {
    this.setState({ markers: [], allSelected: false });
    AsyncStorage.setItem("markers", JSON.stringify([]));
  };

  selectMarker(index, value) {
    let newMarkers = this.state.markers.slice();
    newMarkers[index].selected = value;
    this.setState({ markers: newMarkers });
  }

  render() {
    return this.state.waiting ? (
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          style={{ flex: 1, alignSelf: "center" }}
          size={100}
        />
      </View>
    ) : (
      <View style={style.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <MyButton
            action={() => {
              this.savePosition();
            }}
            title="Save current location"
            textStyle={style.buttonText}
            style={{ margin: 10, height: 42 }}
          />
          <MyButton
            action={() => {
              this.deleteMarkers();
            }}
            title="Delete all saved locations"
            textStyle={style.buttonText}
            style={{ margin: 10, height: 42 }}
          />
        </View>
        <MyButton
          action={() => {
            let selectedMarkers = this.state.markers.filter(m => {
              return m.selected;
            });
            if (selectedMarkers.length == 0) {
              alert("Select at least one marker to display.");
            } else {
              this.props.navigation.navigate("Map", {
                markers: selectedMarkers
              });
            }
          }}
          title="Open the map"
          textStyle={style.buttonText}
          style={{ margin: 10, height: 42 }}
        />
        <Switch
          value={this.state.allSelected}
          onValueChange={value => {
            let newMarkers = this.state.markers.map(m => {
              m.selected = value;
              return m;
            });
            this.setState({ markers: newMarkers, allSelected: value });
          }}
          style={style.selectAll}
        />
        {this.state.loaded ? (
          <FlatList
            keyExtractor={(item, index) => item + index}
            data={this.state.markers}
            renderItem={obj => (
              <ListItem
                index={obj.index}
                timestamp={obj.item.timestamp}
                longitude={obj.item.longitude}
                latitude={obj.item.latitude}
                selected={obj.item.selected}
                selectFunc={this.selectMarker.bind(this)}
              />
            )}
          />
        ) : null}
      </View>
    );
  }

  static navigationOptions = {
    title: "Saved locations",
    headerStyle: {
      backgroundColor: "#1111ee"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

const style = {
  container: {},
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center"
  },
  selectAll: {
    marginRight: 24,
    marginBottom: 20
  }
};

export default List;
