import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main";
import Users from "./components/Users";
import EditUser from "./components/EditUser";

const Root = createStackNavigator({
  Main: { screen: Main },
  Users: { screen: Users },
  EditUser: { screen: EditUser }
});

const App = createAppContainer(Root);

export default App;
