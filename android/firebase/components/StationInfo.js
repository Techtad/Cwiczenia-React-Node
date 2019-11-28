import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyButton from "./MyButton";

class StationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <View>
          <Text style={{ fontWeight: "bold" }}> {this.props.name} </Text>
          <Text> LAT: {this.props.longitude} </Text>
          <Text> LON: {this.props.latitude} </Text>
          <Text> Razem stacji: {this.props.totalDocks} </Text>
        </View>
        <View>
          <View style={{ width: 300, height: 60, backgroundColor: "gray" }}>
            <View style={{ flexDirection: "row", height: 30 }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "black",
                  width:
                    (300 * this.props.availableBikes) / this.props.totalDocks
                }}
              >
                R
              </Text>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  width:
                    300 *
                    (1 - this.props.availableBikes / this.props.totalDocks)
                }}
              >
                S
              </Text>
            </View>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                height: 30,
                width: 300,
                backgroundColor:
                  this.props.statusValue == "In Service" ? "green" : "orange"
              }}
            >
              {this.props.statusValue == "In Service"
                ? "DOSTĘPNA"
                : "W NAPRAWIE"}
            </Text>
          </View>
          <MyButton
            style={{ alignSelf: "flex-end" }}
            textStyle={{ fontWeight: "bold" }}
            action={() =>
              this.props.navigation.navigate("MapScreen", {
                marker: {
                  title: this.props.name,
                  latitude: this.props.latitude,
                  longitude: this.props.longitude
                }
              })
            }
            title="MAPA"
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default StationInfo;
