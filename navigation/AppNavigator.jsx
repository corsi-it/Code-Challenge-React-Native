import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../src/screens/DetailsScreen";
import HomeScreen from "../src/screens/HomeScreen";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Details" component={DetailsScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
