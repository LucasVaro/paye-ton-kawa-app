import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login, Product, Scanner, ARView } from "../screens";
const { Navigator, Screen } = createNativeStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen name="Scanner" component={Scanner} />
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
      {/* <Screen name="ARView" component={ARView} options={{ headerShown: false }} /> */}
    </Navigator>
  </NavigationContainer>
);

export default Router;
