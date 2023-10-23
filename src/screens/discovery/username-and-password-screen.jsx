import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Dimensions } from "react-native";
import Button from "../../components/button";
import { COLORS, SIZES } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";

const UsernameAndPasswordScreen = ({ navigation, route }) => {
  const { profession } = route.params;
  const [nameText, setNameText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [text, setText] = useState(
    "(Au minimum 8 caractères, une majuscule, et un chiffre)"
  );
  const [colorText, setColorText] = useState("#000000");
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleUsernameChange = (text) => {
    setNameText(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text === "") {
      setText("(Au moins 8 caractères, une majuscule, et un chiffre)");
      setColorText("#000000");
    } else if (passwordRegex.test(text)) {
      setText("Validé");
      setColorText("green");
    } else {
      setColorText("red");
      setText("(Au moins 8 ccaractères, une majuscule, et un chiffre)");
    }
  };

  const handlePasswordConfirmChange = (text) => {
    setPasswordConfirm(text);
  };

  const handleNextBtnPress = useCallback(() => {
    if (password !== passwordConfirm) {
      Alert.alert("Les mots de passe ne sont pas identiques");
    } else {
      if (nameText && password && passwordConfirm) {
        navigation.navigate("LastMenstrualCycleStartAge", {
          user: {
            selected: null,
            nomDutilisateur: nameText,
            motDePasse: password,
            profession: null,
          },
        });
      } else {
        Alert.alert("Veuillez compléter tous les champs :)");
      }
    }
  }, [nameText, password, passwordConfirm, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrez un nom d'utlisateur et un mot de passe</Text>
      <View style={styles.inputBox}>
        <View style={styles.inputBoxDeeper}>
          <View>
            <TextInput
              cursorColor={COLORS.accent400}
              placeholder="Nom d'utilisateur"
              value={nameText}
              onChangeText={handleUsernameChange}
              style={styles.input}
            />
          </View>

          <View>
            <TextInput
              secureTextEntry
              cursorColor={COLORS.accent400}
              placeholder="Mot de passe"
              value={password}
              onChangeText={handlePasswordChange}
              style={styles.input}
            />
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: SIZES.small,
                color: colorText,
              }}
            >
              {text}
            </Text>
          </View>

          <View>
            <TextInput
              secureTextEntry
              cursorColor={COLORS.accent400}
              placeholder="Confirmez le mot de passe"
              value={passwordConfirm}
              onChangeText={handlePasswordConfirmChange}
              style={styles.input}
            />
          </View>
        </View>
      </View>
      <View style={styles.nextBtn}>
        <Button
          bgColor={COLORS.accent600}
          textColor={COLORS.neutral100}
          borderRadius={15}
          onPress={handleNextBtnPress}
        >
          Suivant
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  title: {
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.xxLarge),
    marginBottom: 15,
    textAlign: "center",
    marginTop: 70,
  },
  inputBoxDeeper: {
    marginTop: 70,
    marginLeft: 20,
    gap: RFValue(15),
  },
  input: {
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(10),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
    fontFamily: "Medium",
    width: Math.floor(Dimensions.get("window").width) - 40,
  },
  nextBtn: {
    marginTop: Math.floor(Dimensions.get("window").height) / 6,
    marginLeft: 20,
  },
});

export default UsernameAndPasswordScreen;