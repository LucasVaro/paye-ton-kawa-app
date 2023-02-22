import { useState, useContext, useEffect } from "react";
import { Text, SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { ProductCard, NotAuthorized } from "../components";
import { LoginContext } from "../context/login";
import { useProducts } from "../services";

const Home = () => {
  const { token } = useContext(LoginContext);
  const [list, setList] = useState(undefined);
  const { getProducts } = useProducts();

  const initProducts = async () => {
    try {
      const { data } = await getProducts();
      setList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <SafeAreaView>
      {token && (
        <ScrollView>
          <View style={styles.userContainer}>
            <Text style={styles.userText}>Bienvenue</Text>
          </View>
          <View style={styles.listProductContainer}>
            {list &&
              list.map((product) => (
                <ProductCard
                  title={product?.name}
                  description={product?.details?.description}
                />
              ))}
            {!list && <Text style={styles.textLoading}>Chargement...</Text>}
          </View>
        </ScrollView>
      )}
      {!token && <NotAuthorized />}
    </SafeAreaView>
  );
};

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
  textLoading: { textAlign: "center", marginTop: 50 },
});

export default Home;
