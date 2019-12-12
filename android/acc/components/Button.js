import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    onTouch: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.any,
    disabled: PropTypes.bool,
    effect: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.style = this.props.style || { color: "black", fontSize: 24 };
    this.pressHandler = this.pressHandler.bind(this);
    this.longPressHandler = this.longPressHandler.bind(this);
  }

  pressHandler() {
    if (this.props.onPress) this.props.onPress(this);
  }

  longPressHandler() {
    if (this.props.onLongPress) this.props.onLongPress(this);
  }

  render() {
    var Effect;
    var effectProps = {};
    switch (this.props.effect && this.props.effect.toLowerCase()) {
      case "opacity":
        Effect = TouchableOpacity;
        break;
      case "nativefeedback":
        Effect = TouchableNativeFeedback;
        effectProps["background"] = TouchableNativeFeedback.Ripple(
          "rgba(255,255,255,1)",
          true
        );
        break;
      default:
        Effect = TouchableOpacity;
    }
    let textstyle;
    if (Array.isArray(this.style)) {
      textstyle = this.style.map(s =>
        Object.keys(s)
          .filter(
            key =>
              key.startsWith("text") || key.startsWith("font") || key == "color"
          )
          .reduce((reducer, key) => {
            reducer[key] = s[key];
            return reducer;
          }, {})
      );
    } else {
      textstyle = Object.keys(this.style)
        .filter(
          key =>
            key.startsWith("text") || key.startsWith("font") || key == "color"
        )
        .reduce((reducer, key) => {
          reducer[key] = this.style[key];
          return reducer;
        }, {});
    }
    return (
      <Effect
        {...effectProps}
        onPress={this.pressHandler}
        onLongPress={this.longPressHandler}
        disabled={this.props.disabled}
        style={this.style}
      >
        <View style={this.props.innerStyle}>
          {typeof this.props.children == "string" ? (
            <Text style={textstyle}>{this.props.children}</Text>
          ) : (
            this.props.children
          )}
        </View>
      </Effect>
    );
  }
}

export default Button;
