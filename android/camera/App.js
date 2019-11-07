import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./screens/Main";
import Gallery from "./screens/Gallery";
import CameraScreen from "./screens/CameraScreen";
import BigPhoto from "./screens/BigPhoto";

const Root = createStackNavigator({
  Main: { screen: Main },
  Gallery: { screen: Gallery },
  CameraScreen: { screen: CameraScreen },
  BigPhoto: { screen: BigPhoto }
});

const App = createAppContainer(Root);

export default App;
