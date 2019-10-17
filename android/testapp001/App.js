import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Display from "./calculator/components/Display";
import Button from "./calculator/components/Button";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      previousEquation: "",
      currentEquation: ""
    };
  }

  compileEquation(words) {
    let txt = "";
    words.map((w, i) => {
      if (i > 0) txt += " ";
      txt += w;
    });
    return txt;
  }

  insertDigit(d) {
    let newWords = this.state.words;

    if (newWords.length != 0) {
      if (newWords[newWords.length - 1] == "-") {
        if (
          newWords.length == 1 ||
          (newWords.length > 2 &&
            isNaN(parseFloat(newWords[newWords.length - 2])))
        ) {
          newWords[newWords.length - 1] = newWords[newWords.length - 1] + d;
        } else newWords.push(d);
      } else if (isNaN(parseFloat(newWords[newWords.length - 1]))) {
        newWords.push(d);
      } else {
        if (
          newWords[newWords.length - 1] == "0" ||
          newWords[newWords.length - 1] == "-0"
        ) {
          newWords[newWords.length - 1] = newWords[newWords.length - 1].substr(
            0,
            newWords[newWords.length - 1].length - 1
          );
        }
        newWords[newWords.length - 1] = newWords[newWords.length - 1] + d;
      }
    } else newWords.push(d);

    this.setState({ words: newWords, previousEquation: "" }, () => {
      this.setState({
        currentEquation: this.compileEquation(this.state.words)
      });
    });
  }

  insertOperator(o) {
    if (this.state.words.length == 0) {
      if (o == "-") {
        let newWords = ["-"];
        this.setState({ words: newWords, previousEquation: "" }, () => {
          this.setState({
            currentEquation: this.compileEquation(this.state.words)
          });
        });
      } else return;
    }

    let newWords = this.state.words;
    let lastWord = newWords[newWords.length - 1];

    if (
      /* !isNaN(parseFloat(lastWord)) */ lastWord &&
      !opBtns.includes(lastWord)
    ) {
      if (lastWord.endsWith("."))
        newWords[newWords.length - 1] = lastWord.substr(0, lastWord.length - 1);

      newWords.push(o);

      this.setState({ words: newWords, previousEquation: "" }, () => {
        this.setState({
          currentEquation: this.compileEquation(this.state.words)
        });
      });
    } else if (o == "-" && ["/", "*"].includes(lastWord)) {
      newWords.push(o);

      this.setState({ words: newWords, previousEquation: "" }, () => {
        this.setState({
          currentEquation: this.compileEquation(this.state.words)
        });
      });
    }
  }

  insertDecimalPoint() {
    if (this.state.words.length == 0) return;

    let newWords = this.state.words;
    let lastWord = newWords[newWords.length - 1];
    if (!isNaN(parseFloat(lastWord)) && !lastWord.includes("."))
      newWords[newWords.length - 1] = lastWord + ".";

    this.setState({ words: newWords, previousEquation: "" }, () => {
      this.setState({
        currentEquation: this.compileEquation(this.state.words)
      });
    });
  }

  eraseChar() {
    if (this.state.words.length == 0) return;

    let newWords = this.state.words;
    let lastWord = newWords[newWords.length - 1];

    if (lastWord.length > 1)
      newWords[newWords.length - 1] = lastWord.substr(0, lastWord.length - 1);
    else newWords = newWords.slice(0, newWords.length - 1);

    this.setState({ words: newWords, previousEquation: "" }, () => {
      this.setState({
        currentEquation: this.compileEquation(this.state.words)
      });
    });
  }

  eraseAll() {
    this.setState({ words: [], previousEquation: "" }, () => {
      this.setState({
        currentEquation: this.compileEquation(this.state.words)
      });
    });
  }

  doTheMath() {
    if (this.state.words.length == 0) return;

    let newWords = this.state.words;
    let lastWord = newWords[newWords.length - 1];

    if (!isNaN(parseFloat(lastWord))) {
      if (lastWord.endsWith("."))
        newWords[newWords.length - 1] = lastWord.substr(0, lastWord.length - 1);

      let equation = this.compileEquation(newWords);
      let result;
      try {
        result = eval(equation).toString();
      } catch {
        result = "ERROR";
      }

      this.setState(
        {
          words: [result],
          previousEquation: equation + " ="
        },
        () => {
          this.setState({
            currentEquation: this.compileEquation(this.state.words)
          });
        }
      );
    }
  }

  render() {
    let numPadRows = [];
    let opCol = [];

    numPadBtns.map((el, i) => {
      let btns = [];
      el.map((txt, i) => {
        let btnFunc;
        switch (txt) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            btnFunc = function() {
              this.insertDigit(txt);
            }.bind(this);
            break;
          case ".":
            btnFunc = this.insertDecimalPoint.bind(this);
            break;
          case "=":
            btnFunc = this.doTheMath.bind(this);
            break;
          default:
            btnFunc = function() {
              alert("ERROR: Unknown button");
            };
            break;
        }
        btns.push(
          <Button key={i} text={txt} bgColor="#434343" pressFunc={btnFunc} />
        );
      });
      numPadRows.push(
        <View key={i} style={styles.row}>
          {btns}
        </View>
      );
    });

    opBtns.map((op, i) => {
      let btnFunc;
      switch (op) {
        case "/":
        case "*":
        case "+":
        case "-":
          btnFunc = function() {
            this.insertOperator(op);
          }.bind(this);
          break;
        case "⌫":
          btnFunc = this.eraseChar.bind(this);
          break;
        case "C":
          btnFunc = this.eraseAll.bind(this);
          break;
        default:
          btnFunc = function() {
            alert("ERROR: Unknown button");
          };
          break;
      }
      opCol.push(
        <Button key={i} text={op} bgColor="#636363" pressFunc={btnFunc} />
      );
    });

    return (
      <View style={styles.container}>
        <Display
          previousEquation={this.state.previousEquation + " "}
          currentEquation={this.state.currentEquation + "  "}
        />
        <View style={styles.row}>
          <View
            style={{
              flex: 3,
              flexDirection: "column"
            }}
          >
            {numPadRows}
          </View>
          <View style={styles.column}>{opCol}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 1,
    flexDirection: "column"
  }
});

const numPadBtns = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "="]
];

const opBtns = ["⌫", "C", "/", "*", "-", "+"];
