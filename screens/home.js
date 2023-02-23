import { useState, useContext, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductCard, NotAuthorized } from "../components";
import { LoginContext } from "../context/login";
import { useProducts } from "../services";

const Home = () => {
  const { token, setToken } = useContext(LoginContext);
  const navigation = useNavigation();
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

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(undefined);
      navigation.navigate("Login");
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
          <View style={styles.headerContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.userText}>Bienvenue</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  logoutBtn: {
    width: "40%",
    height: 40,
    backgroundColor: "#FF0000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  logoutText: {
    color: "#FFF",
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
