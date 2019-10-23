import React, { Component } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={this.props.style || {}}
      >
        <Text style={this.props.textStyle || {}}>
          {" "}
          {this.props.title || ""}{" "}
        </Text>
      </TouchableOpacity>
    );
  }
}

MyButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func.isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object
};

export default MyButton;
