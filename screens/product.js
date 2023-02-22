import {
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const name = route.params.name;
  const description = route.params.description;
  return (
    <SafeAreaView>
      <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <View style={styles.productImageBackground}>
            <Image
              style={styles.productImage}
              source={require("../assets/img/cafe.png")}
            />
          </View>
        </View>
        <Text style={styles.productTitle}>{name}</Text>
        <Text style={styles.productDescription}>
          {description}
        </Text>
        <Pressable
          style={styles.productBtn}
          onPress={() => navigation.navigate("ARView")}
        >
          <Text style={styles.productTextBtn}>Voir en Réalité Augmentée</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: 10,
  },
  productImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 400,
    height: 400,
    marginTop: 100,
  },
  productImageBackground: {
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 250,
    height: 250,
    borderRadius: 150,
  },
  productTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    textAlign: "left",
    marginTop: -50,
  },
  productDescription: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    textAlign: "left",
    marginTop: 5,
  },
  productImage: {
    width: 350,
    height: 350,
    marginTop: -100,
  },
  productBtn: {
    backgroundColor: "#008248",
    width: "100%",
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productTextBtn: {
    fontFamily: "Montserrat_500Medium",
    color: "#FFF",
    fontSize: 16,
  },
});

export default Product;
