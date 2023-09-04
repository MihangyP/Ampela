import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import Button from "../../components/button";
import { COLORS, SIZES, images } from "../../../constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { authenticateUser } from "../../../config/databaseLocalConfig";

const LogInScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [mailOrTel, setMailOrTel] = useState(""); 
  
  const handleMailOrTextChange = (text) => {
    setMailOrTel(text);
  }
 
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleLogInBtnPress = async () => {
    if (mailOrTel && password) {
      try {
      
        signInWithEmailAndPassword(auth, mailOrTel, password)
        .then(() => {
          navigation.navigate("CalendarScreen");
          console.log("Login success");
        })
        .catch((err) => Alert.alert("Login error", err.message));
      
      } catch (error) {
        
        Alert.alert("Erreur lors de la connexion", error.message);
      }
    } else {
      Alert.alert("Veuillez remplir tous les champs...");
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.ignoreContainer}
        onPress={() => navigation.navigate("CalendarScreen")}
      >
        <Text style={styles.ignoreText}>Ignorer</Text>
      </TouchableOpacity>
      <Image source={images.wavebg} style={styles.waveBg} />
      <Text style={styles.title}>Se connecter</Text>
     
      <View style={styles.inputBox}>
        <View style={styles.inputBoxDeeper}>
          <TextInput
            cursorColor={COLORS.accent400}
            value={mailOrTel}
            onChangeText={handleMailOrTextChange}
            placeholder="Mail ou Tel"
            style={styles.input}
          />
          
            <TextInput
              secureTextEntry
              cursorColor={COLORS.accent400}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Mot de passe"
              style={styles.input}
            />
            
        
          <Button
            bgColor={COLORS.accent600}
            textColor={COLORS.neutral100}
            borderRadius={15}
            onPress={handleLogInBtnPress}
          >
            Se connecter
          </Button>
          <Text style={styles.textBottom}>
            Vous n'avez pas de compte ?
            <Text style={styles.textLogIn}
              onPress={() => navigation.navigate('SignUpScreen')}
            > Inscrivez-vous</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  ignoreContainer: {
    zIndex: 20000,
    position: "absolute",
    top: 60,
    right: 20,
  },
  ignoreText: {
    fontFamily: "Medium",
    color: COLORS.neutral400,
  },
  title: {
    fontFamily: "Bold",
    fontSize: SIZES.xxLarge,
    marginBottom: 15,
    marginTop: "80%",
    textAlign: "center",
  },
  waveBg: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
  },
  inputBox: {
    position: "absolute",
    height: "32%",
    backgroundColor: "white",
    bottom: 0,
  },
  inputBoxDeeper: {
    bottom: 5,
    marginLeft: 20,
    gap: 15,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
    fontFamily: "Medium",
    width: Math.floor(Dimensions.get("window").width) - 40,
  },
  textBottom: {
    textAlign: "center",
  },
  textLogIn: {
    color: COLORS.accent600,
  },
});

export default LogInScreen;
