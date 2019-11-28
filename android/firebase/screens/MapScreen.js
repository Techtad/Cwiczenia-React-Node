import React, { Component } from "react";
import MapView from "react-native-maps";
import MyButton from "../components/MyButton";
import Colors from "../constants/Colors";

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: this.props.navigation.state.params.marker
    };
  }

  render() {
    return (
      <MapView
        style={style.map}
        initialRegion={{
          latitude: this.state.marker.latitude,
          longitude: this.state.marker.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.state.marker.latitude,
            longitude: this.state.marker.longitude
          }}
          title={this.state.marker.title}
        />
      </MapView>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.marker.title,
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
            navigation.goBack();
          }}
        />
      )
    };
  };
}

const style = {
  map: {
    flex: 1
  }
};

export default MapScreen;
