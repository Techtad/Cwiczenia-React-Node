import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./screens/Main";

const Root = createStackNavigator({
  Main: { screen: Main }
});

const App = createAppContainer(Root);

export default App;
