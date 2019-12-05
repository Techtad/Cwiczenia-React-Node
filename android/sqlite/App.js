import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./screens/Main";
import AlarmList from "./screens/AlarmList";
import NewAlarm from "./screens/NewAlarm";
import Database from "./Database";

const Root = createStackNavigator({
  Main: { screen: Main },
  AlarmList: { screen: AlarmList },
  NewAlarm: { screen: NewAlarm }
});

const App = createAppContainer(Root);

export default App;

Database.createTable();
