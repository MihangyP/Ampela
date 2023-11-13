import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import Button from "../../components/button";
import { COLORS, SIZES, images } from "../../../constants";
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import CustomPopup from "../../components/CustomPopup";
import { getLastInsertedUserId, selectUsers, updateEmailForUser } from "../../../config/databaseLocalConfig";
import * as SQLite from 'expo-sqlite';

const LogInScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [mailOrTel, setMailOrTel] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupEmail, setPopupEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);


  useEffect(() => {
    setInputsDisabled(isLoading);
  }, [isLoading]);

  const handleMailOrTextChange = (text) => {
    setMailOrTel(text);
  }

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const handleLogInBtnPress = async () => {
    if (mailOrTel && password) {
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, mailOrTel);

        if (signInMethods.length === 0) {
          setPopupMessage("Utilisateur introuvable");
          setIsPopupVisible(true);
        } else {

          setIsLoading(true);

          signInWithEmailAndPassword(auth, mailOrTel, password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              if (!user.emailVerified) {
                sendEmailVerification(user);
                setPopupMessage("Compte non confirmé");
                setPopupEmail(mailOrTel);
                setIsPopupVisible(true);
              } else {
                const localDb = SQLite.openDatabase("ampela.db");
                const lastInsertedUserId = await getLastInsertedUserId(localDb);
                // console.log(lastInsertedUserId);

                updateEmailForUser(localDb, lastInsertedUserId, mailOrTel);
                // selectUsers(localDb);
                navigation.navigate("CalendarScreen");
                console.log("Login success");
              }
            })
            .catch((err) => {
              if (err.code === "auth/wrong-password") {
                setPopupMessage("Mot de passe incorrect");
                setPopupEmail(mailOrTel);
                setIsPopupVisible(true);
              } else {
                setPopupMessage("Erreur de connexion");
                setPopupEmail(err.message);
                setIsPopupVisible(true);
              }
            })
            .finally(() => {

              setIsLoading(false);
            });
        }
      } catch (error) {
        setPopupMessage("Erreur lors de la connexion");
        setPopupEmail(error.message);
        setIsPopupVisible(true);
      }
    } else {
      setPopupMessage("Veuillez remplir tous les champs...");
      setIsPopupVisible(true);
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
            editable={!inputsDisabled}
          />

          <TextInput
            secureTextEntry
            cursorColor={COLORS.accent400}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Mot de passe"
            style={styles.input}
            editable={!inputsDisabled}
          />

          <Button
            bgColor={COLORS.accent600}
            textColor={COLORS.neutral100}
            borderRadius={15}
            onPress={handleLogInBtnPress}
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </Button>
          <Text style={styles.textBottom}>
            Vous n'avez pas de compte ?
            <Text
              style={styles.textLogIn}
              onPress={() => navigation.navigate('SignUpScreen')}
            > Inscrivez-vous</Text>
          </Text>
        </View>
      </View>
      <CustomPopup
        message={popupMessage}
        email={popupEmail}
        visible={isPopupVisible}
        onClose={handlePopupClose}
      />
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
