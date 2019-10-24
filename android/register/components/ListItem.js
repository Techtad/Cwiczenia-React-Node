import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import MyButton from "./MyButton";
import Settings from "./Settings";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Image style={style.img} source={require("../assets/avatar.png")} />
        <Text style={{ fontSize: this.props.fontSize }}>
          {this.props.index}: {this.props.username} {this.props.password}
        </Text>
        <MyButton
          title="EDYTUJ"
          action={() => {
            this.props.navFunc(this.props.username, this.props.password);
          }}
          textStyle={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: this.props.fontSize
          }}
        />
        <MyButton
          title="USUŃ"
          action={() => {
            fetch(Settings.serverAddress, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                action: "delete",
                username: this.props.username
              })
            })
              .then(resp => {
                return resp.json();
              })
              .then(respJson => {
                if (respJson.updatedUsers) {
                  this.props.updateUsersFunc(respJson.updatedUsers);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }}
          textStyle={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: this.props.fontSize
          }}
        />
      </View>
    );
  }
}

const style = {
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20
  },
  img: {
    width: 36,
    height: 36
  }
};

export default ListItem;
