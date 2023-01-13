import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login } from "../screens";
const { Navigator, Screen } = createNativeStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen name="Login" component={Login} />
    </Navigator>
  </NavigationContainer>
);

export default Router;
