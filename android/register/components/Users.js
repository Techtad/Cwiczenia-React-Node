import React, { Component } from "react";
import { FlatList, View } from "react-native";
import ListItem from "./ListItem";
import MyButton from "./MyButton";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.navigation.state.params.users
    };
  }

  render() {
    return (
      <View>
        <MyButton
          title="BACK TO LOGIN PAGE"
          action={() => {
            this.props.navigation.navigate("Main");
          }}
          style={{ alignSelf: "center" }}
          textStyle={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 10
          }}
        />
        <FlatList
          data={this.state.users}
          renderItem={obj => (
            <ListItem
              index={obj.index}
              username={obj.item.username}
              password={obj.item.password}
              fontSize={18}
              navFunc={function(username, password) {
                this.props.navigation.navigate("EditUser", {
                  username: username,
                  password: password
                });
              }.bind(this)}
              updateUsersFunc={function(newUsers) {
                this.setState({ users: newUsers });
              }.bind(this)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: "admin page",
    headerStyle: {
      backgroundColor: "#4caf50"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
}

export default Users;
