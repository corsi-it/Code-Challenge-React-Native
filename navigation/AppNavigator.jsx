import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../src/screens/DetailsScreen";
import HomeScreen from "../src/screens/HomeScreen";
import NewTodoScreen from "../src/screens/NewTodoScreen";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home"
                       options={{
                           headerTitle: "All ToDos"
                       }}
                       component={HomeScreen} />
      <AppStack.Screen name="Details"
                       options={{
                           headerTitle: "ToDo Detail"
                       }}
                       component={DetailsScreen} />
        <AppStack.Screen name="New"
                         options={{
                             headerTitle: "New ToDo"
                         }}
                         component={NewTodoScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
