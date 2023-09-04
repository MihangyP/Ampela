import React, { useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../../../config/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { useNavigation } from "@react-navigation/native"; 
import Button from "../../components/button";
import { COLORS, SIZES, images } from "../../../constants";
import firebase from "firebase/app"; 


const SignupScreen = () => {
  const navigation = useNavigation();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nameText, setNameText] = useState("");
  const [password, setPassword] = useState("");
  const [mailOrTel, setMailOrTel] = useState("");
  const [text, setText] = useState(
    "(At least 8 characters, one uppercase letter, and one digit)"
  );
  const [colorText, setColorText] = useState("#000000");

  const handleMailOrTextChange = (text) => {
    setMailOrTel(text);
  };

  const handleNameTextChange = (text) => {
    setNameText(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (password === "") {
      setColorText((c) => c);
    } else {
      setColorText("red");
      setText("(At least 8 characters, one uppercase letter, and one digit)");
    }
  };

  const handleSignUpBtnPress = async () => {
    if (mailOrTel && password && nameText) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          mailOrTel,
          password
        );

        const user = userCredential.user;
        const { uid, email } = user;

        const db = getFirestore();
        const usersCollectionRef = doc(db, "users", uid);

        await setDoc(usersCollectionRef, {
          uid: uid,
          email: email,
          pseudo: nameText,
        });

        // setIsAuthenticated(true);

        Alert.alert("Registration Successful!", "Your account has been created successfully.");

        navigation.navigate("main");
      } catch (error) {
        console.error("Error during registration:", error.message);
        Alert.alert("Registration Error", error.message);
      }
    } else {
      Alert.alert("Please fill in all fields");
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
      <Text style={styles.title}>S'inscrire</Text>
      
      <View style={styles.inputBox}>
        <View style={styles.inputBoxDeeper}>
          <TextInput
            cursorColor={COLORS.accent400}
            value={nameText}
            onChangeText={handleNameTextChange}
            placeholder="Nom et prénom"
            style={styles.input}
          />
          <TextInput
            cursorColor={COLORS.accent400}
            value={mailOrTel}
            onChangeText={handleMailOrTextChange}
            placeholder="Mail ou Tel"
            style={styles.input}
          />
          <View>
            <TextInput
              secureTextEntry
              cursorColor={COLORS.accent400}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Mot de passe"
              style={styles.input}
            />
            <Text style={{
                fontFamily: "Medium",
                fontSize: SIZES.small,
                color: colorText
            }}>{text}</Text>
          </View>
          <Button
            bgColor={COLORS.accent600}
            textColor={COLORS.neutral100}
            borderRadius={15}
            onPress={handleSignUpBtnPress}
          >
            S'inscrire
          </Button>
          <Text style={styles.textBottom}>
            Vous avez déjà un compte ?
            <Text style={styles.textLogIn}
              onPress={() => navigation.navigate('LogInScreen')}
            > connectez-vous</Text>
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
    marginTop: "70%",
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
    height: "50%",
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

export default  SignupScreen;
