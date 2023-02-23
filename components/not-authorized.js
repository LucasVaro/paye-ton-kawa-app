import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NotAuthorized = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>
        Vous ne pouvez pas avoir accès à cette page si vous n'êtes pas connecté
      </Text>
      <TouchableOpacity
        style={{ marginTop: 25 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#008248" }}>
          Retour vers la page de connexion
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotAuthorized;
