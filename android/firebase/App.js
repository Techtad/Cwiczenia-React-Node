import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./screens/Main";
import Authorization from "./screens/Authorization";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Stations from "./screens/Stations";
import MapScreen from "./screens/MapScreen";

const Root = createStackNavigator({
  Main: { screen: Main },
  Authorization: { screen: Authorization },
  Register: { screen: Register },
  Login: { screen: Login },
  Stations: { screen: Stations },
  MapScreen: { screen: MapScreen }
});

const App = createAppContainer(Root);

export default App;
