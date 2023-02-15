import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AppNavigatorParamList = {
  Home: undefined;
  Login: undefined;
  Product: {
    title: string;
    description: string;
  };
  AR: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  "Product" | "Home" | "Login" | "AR"
>;
