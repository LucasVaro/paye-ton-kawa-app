import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppNavigatorParamList } from "../types/types";
import Home from "../screens/home";
import Login from "../screens/login";
import Product from "../screens/product";
import RealityScene from "../screens/realityScene";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } =
  createNativeStackNavigator<AppNavigatorParamList>();

const Router = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Login" component={Login} />
        <Screen name="Product" component={Product} />
        <Screen name="AR" component={RealityScene} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
