import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main";
import List from "./components/List";
import MapScreen from "./components/MapScreen";

const Root = createStackNavigator({
  Main: { screen: Main },
  List: { screen: List },
  Map: { screen: MapScreen }
});

const App = createAppContainer(Root);

export default App;
