import React, { Component } from "react";
import { View, Text, Switch, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import Database from "../Database";
import { Animated } from "react-native";
import Colors from "../constants/Colors";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      weekdays: props.weekdays,
      enabled: props.enabled,
      weekdaysExtended: false,
      weekdaysHeight: new Animated.Value(0)
    };
  }

  toggleWeekdaysDisplay() {
    Animated.spring(this.state.weekdaysHeight, {
      toValue: this.state.weekdaysExtended ? 0 : 64,
      bounciness: 0
    }).start();
    this.setState({ weekdaysExtended: !this.state.weekdaysExtended });
  }

  toggleWeekday(num) {
    let newWeekdays = this.state.weekdays;
    newWeekdays[num] = !newWeekdays[num];
    this.setState({ weekdays: newWeekdays }, () => {
      this.modifyRecord();
    });
  }

  modifyRecord() {
    Database.modifyAlarm(
      this.props.id,
      this.state.time,
      this.state.weekdays,
      this.state.enabled
    );
  }

  render() {
    let weekdays = [];
    let days = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"];
    for (let day = 0; day < 7; day++) {
      let weekday = days[day];
      weekdays.push(
        <TouchableNativeFeedback
          key={day}
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,255,255,1)",
            true
          )}
          onPress={() => this.toggleWeekday(day)}
        >
          <Text
            style={{
              padding: 10,
              backgroundColor: this.state.weekdays[day]
                ? Colors.tintColor
                : "transparent"
            }}
          >
            {weekday}
          </Text>
        </TouchableNativeFeedback>
      );
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
            onValueChange={v =>
              this.setState({ enabled: v }, () => {
                this.modifyRecord();
              })
            }
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
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,1)",
              true
            )}
            onPress={() => {
              Database.deleteAlarm(this.props.id);
              this.props.remove();
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
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,1)",
              true
            )}
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
