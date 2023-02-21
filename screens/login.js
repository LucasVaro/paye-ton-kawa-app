import { useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AnimatedCheckIcon } from "../components";

const Login = () => {
  const navigation = useNavigation();
  const [mailSended, setMailSended] = useState(false);
  const [email, setEmail] = useState();

  const sendMail = async () => {
    try {
      setMailSended(true);
    } catch (e) {
      console.error(e);
    }
  };

  const resendMail = () => {
    setMailSended(false);
  };

  const handleScan = () => {
    navigation.navigate("Scanner");
  };

  return (
    <SafeAreaView style={styles.body}>
      {!mailSended && (
        <>
          <Text style={styles.text}>
            Veuillez renseigner votre adresse mail
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          <TouchableOpacity style={styles.button} onPress={sendMail}>
            <Text style={styles.textButton}>Recevoir mon QR Code</Text>
          </TouchableOpacity>
        </>
      )}
      {mailSended && (
        <>
          <Text style={styles.text}>
            Scanner le QR code que vous avez reçu par mail pour vous connecter
          </Text>
          <AnimatedCheckIcon isChecked={mailSended} />
          <TouchableOpacity style={styles.button} onPress={handleScan}>
            <Text style={styles.textButton}>Scanner le QR code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resendMailButton}
            onPress={resendMail}
          >
            <Text>Vous n'avez pas reçu d'email?</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
  },
  text: {
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  input: {
    width: "90%",
    backgroundColor: "#F6F6F6",
    height: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008248",
    height: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  textButton: {
    color: "#FFF",
    textTransform: "uppercase",
    fontFamily: "Montserrat_700Bold",
  },
  resendMailButton: {
    marginTop: 20,
  },
});

export default Login;
