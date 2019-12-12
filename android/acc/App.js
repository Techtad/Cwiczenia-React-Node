import { createStackNavigator, createAppContainer } from "react-navigation";
import Entry from "./screens/Entry";
import Main from "./screens/Main";

const Root = createStackNavigator({
  Entry: { screen: Entry },
  Main: { screen: Main }
});

const App = createAppContainer(Root);

export default App;
