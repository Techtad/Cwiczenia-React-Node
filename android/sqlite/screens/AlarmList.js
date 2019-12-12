import React, { Component } from "react";
import { View, Text, ScrollView, Vibration } from "react-native";
import ListItem from "../components/ListItem";
import ImageButton from "../components/ImageButton";
import Colors from "../constants/Colors";
import Database from "../Database";
import { Audio } from "expo-av";

function twoDigiNumString(num) {
  return num < 10 ? "0" + num.toString() : num.toString();
}

class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = { alarms: [], vibrating: false };
  }

  componentDidMount() {
    this.audio = new Audio.Sound();
    this.audio.loadAsync(require("../assets/audio/alarm.mp3")).then(
      () => {
        this.audio.setIsLoopingAsync(true).then(
          () => {
            this.interval = setInterval(this.checkForAlarm.bind(this), 1000);
          },
          () => {}
        );
      },
      () => {}
    );
    this.loadAlarms();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    delete this.interval;
    this.audio.stopAsync();
  }

  loadAlarms() {
    Database.getAlarms().then(alarms => {
      console.log(alarms.rows._array);
      this.setState({ alarms: alarms.rows._array });
    });
  }

  removeAlarmFromDisplay(id) {
    this.setState({
      alarms: this.state.alarms.filter(v => {
        return v.id != id;
      })
    });
  }

  checkForAlarm() {
    let now = new Date();
    let hours = twoDigiNumString(now.getHours());
    let minutes = twoDigiNumString(now.getMinutes());
    let time = `${hours}:${minutes}`;

    let active = false;
    this.state.alarms.map(alarm => {
      //console.log(alarm.enabled, alarm.time, time);
      if (alarm.enabled == 1 && alarm.time == time) active = true;
    });

    if (active) {
      this.audio.playAsync();

      if (!this.state.vibrating) Vibration.vibrate(500);
      this.setState({ vibrating: true });
      setTimeout(() => {
        this.setState({ vibrating: false });
      }, 1000);
    } else {
      this.audio.stopAsync();

      Vibration.cancel();
    }

    //BackgroundTask.finish();
  }

  toggleAlarm(id, enabled) {
    let newAlarms = this.state.alarms.slice();
    for (let al of newAlarms) {
      if (al.id == id) al.enabled = enabled;
    }
    this.setState({ alarms: newAlarms });
  }

  render() {
    let listItems = [];
    this.state.alarms.map((v, i) => {
      listItems.push(
        <ListItem
          key={v.id}
          id={v.id}
          time={v.time}
          weekdays={JSON.parse(v.weekdays)}
          enabled={v.enabled == 1}
          toggleAlarm={this.toggleAlarm.bind(this)}
          remove={this.removeAlarmFromDisplay.bind(this, v.id)}
        />
      );
    });
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <ScrollView
          style={{
            width: "75%",
            marginTop: 20
          }}
        >
          {listItems}
        </ScrollView>
        <ImageButton
          style={{
            backgroundColor: Colors.tintColor,
            width: 80,
            height: 80,
            padding: 10,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            marginTop: 30,
            marginBottom: 30
          }}
          src={require("../assets/images/add.png")}
          imgStyle={{ alignSelf: "center" }}
          action={() => {
            this.props.navigation.navigate("NewAlarm", {
              reload: this.loadAlarms.bind(this)
            });
          }}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: "Lista budzików",
    headerStyle: {
      backgroundColor: Colors.tintColor
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

export default AlarmList;
