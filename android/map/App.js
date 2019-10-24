import { createStackNavigator, createAppContainer } from "react-navigation";

const Root = createStackNavigator({
  Main: { screen: null },
  List: { screen: null },
  Map: { screen: null }
});

const App = createAppContainer(Root);

export default App;
