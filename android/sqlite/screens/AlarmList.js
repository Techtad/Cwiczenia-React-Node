import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import ListItem from "../components/ListItem";
import ImageButton from "../components/ImageButton";
import Colors from "../constants/Colors";
import Database from "../Database";

class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = { alarms: [] };
    this.loadAlarms();
  }

  loadAlarms() {
    Database.getAlarms().then(alarms => {
      console.log(alarms.rows._array);
      this.setState({ alarms: alarms.rows._array });
    });
  }

  render() {
    let listItems = [];
    this.state.alarms.map((v, i) => {
      listItems.push(
        <ListItem
          key={i}
          id={v.id}
          time={v.time}
          weekdays={v.weekdays}
          reload={this.loadAlarms.bind(this)}
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
            width: "75%"
          }}
        >
          {listItems}
        </ScrollView>
        <ImageButton
          style={{
            backgroundColor: Colors.tintColor,
            width: 60,
            height: 60,
            padding: 10,
            borderRadius: 30,
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
