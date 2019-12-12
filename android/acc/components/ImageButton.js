import React, { Component } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

class ImageButton extends Component {
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
        <Image source={this.props.src} style={this.props.imgStyle} />
      </TouchableOpacity>
    );
  }
}

ImageButton.propTypes = {
  src: PropTypes.any.isRequired,
  action: PropTypes.func.isRequired,
  style: PropTypes.object,
  imgStyle: PropTypes.object
};

export default ImageButton;
