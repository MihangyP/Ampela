import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import Button from "../../components/button";
import { COLORS, SIZES, images } from "../../../constants";

const DoctorAuthScreen = ({ navigation }) => {

 const handleLogInBtnPress = () => {
    navigation.navigate('DoctorForumScreen');
 }

  return (
    <View style={styles.container}>
      <Image source={images.wavebg} style={styles.waveBg}/>
      <Text style={styles.title}>Se connecter</Text>
      <View style={{marginTop: 10}}>
        <TexNt style={styles.advice}>1- Pour pouvoir vous connecter, veuiller vérifier votre boîte mail afin de trouver la clé que nous vous avons envoyé</TexNt>
        <Text style={[styles.advice, {marginTop: 10}]}>2- Copier votre clé API et collez la dans le champ ci-dessus</Text>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.inputBoxDeeper}>
          <TextInput
            cursorColor={COLORS.accent400}
            placeholder="Entrez le clé API"
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
    padding: 20
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
    width: "115%",
    top: 0,
    left: 0,
    right: 0,
  },
  advice: {
    fontFamily: "Regular",
    fontSize: SIZES.small,
    lineHeight: 18
  },
  inputBox: {
    position: "absolute",
    height: "32%",
    backgroundColor: "white",
    bottom: 30
  },
  inputBoxDeeper: {
    position: "absolute",
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

});

export default DoctorAuthScreen;
