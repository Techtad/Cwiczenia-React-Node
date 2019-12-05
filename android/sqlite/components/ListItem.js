import React, { Component } from "react";
import { View, Text, Switch, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import Database from "../Database";
import { Animated } from "react-native";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      weekdaysExtended: false,
      weekdaysHeight: new Animated.Value(0)
    };
  }

  toggleWeekdaysDisplay() {
    Animated.spring(this.state.weekdaysHeight, {
      toValue: this.state.weekdaysExtended ? 0 : 56
    }).start();
    this.setState({ weekdaysExtended: !this.state.weekdaysExtended });
  }

  render() {
    let weekdays = [];
    let k = 0;
    for (let day of ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"]) {
      weekdays.push(<Text key={k++}>{day}</Text>);
    }

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          borderBottomWidth: 1,
          borderBottomColor: "black"
        }}
      >
        <View
          style={{
            width: "100%",
            height: 56,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 32 }}>{this.props.time}</Text>
          <Switch
            style={{}}
            value={this.state.enabled}
            onValueChange={v => this.setState({ enabled: v })}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 56,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("rgba(0,0,0,1)", true)}
            onPress={() => {
              Database.deleteAlarm(this.props.id);
              this.props.reload();
            }}
          >
            <Image
              style={{
                width: 32,
                height: 32,
                padding: 1
              }}
              source={require("../assets/images/delete.png")}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("rgba(0,0,0,1)", true)}
            onPress={() => this.toggleWeekdaysDisplay()}
          >
            <Image
              style={{
                width: 32,
                height: 32,
                padding: 1,
                alignSelf: "center"
              }}
              source={
                this.state.weekdaysExtended
                  ? require("../assets/images/hide.png")
                  : require("../assets/images/show.png")
              }
            />
          </TouchableNativeFeedback>
        </View>
        <Animated.View
          style={{
            width: "100%",
            height: this.state.weekdaysHeight,
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {weekdays}
        </Animated.View>
      </View>
    );
  }
}

export default ListItem;
