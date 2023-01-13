import { Text, View, Image, Pressable, StyleSheet } from "react-native";

const ProductCard = ({ title, description }) => (
  <View style={styles.productContainer}>
    <View style={styles.productImageContainer}>
      <Image
        style={styles.productImage}
        source={require("../assets/img/cafe.png")}
      />
    </View>
    <Text style={styles.productTitle}>{title}</Text>
    <Text style={styles.productDescription}>{description}</Text>
    <Pressable style={styles.productBtn}>
      <Text style={styles.productTextBtn}>Plus de détails</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "#008248",
    width: "40%",
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: "60",
  },
  userText: {
    color: "#FFF",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
  listProductContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  productContainer: {
    width: "45%",
    marginTop: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  productImageContainer: {
    display: "flex",
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 150,
    marginTop: -70,
  },
  productTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    textAlign: "left",
    marginTop: 10,
  },
  productDescription: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    textAlign: "left",
    marginTop: 5,
  },
  pricePruductContainer: {
    display: "flex",
    flexDirection: "row",
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

export default ProductCard;
