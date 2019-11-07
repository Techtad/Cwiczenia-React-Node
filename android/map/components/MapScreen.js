import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.navigation.state.params.markers
    };
  }

  render() {
    return (
      <MapView
        style={style.map}
        initialRegion={{
          latitude: this.state.markers[0].latitude,
          longitude: this.state.markers[0].longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }}
      >
        {this.state.markers.map((m, i) => {
          return (
            <MapView.Marker
              key={i}
              coordinate={{ latitude: m.latitude, longitude: m.longitude }}
              title={m.title}
            />
          );
        })}
      </MapView>
    );
  }

  static navigationOptions = {
    title: "Map view",
    headerStyle: {
      backgroundColor: "#1111ee"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

const style = {
  map: {
    flex: 1
  }
};

export default MapScreen;
