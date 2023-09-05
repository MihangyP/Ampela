import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import Button from "../../components/button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS, SIZES } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";

const PersonalHealthTestScreen = ({ navigation }) => {
  const [checkbox1, setCheckbox1] = useState({ id: 1, isChecked: false });
  const [checkbox2, setCheckbox2] = useState({ id: 2, isChecked: false });
  const [selectedCheckboxId, setSelectedCheckboxId] = useState(null);

  const handleCheckbox1Press = () => {
    const newCheckbox1State = !checkbox1.isChecked;
    setCheckbox1({ ...checkbox1, isChecked: newCheckbox1State });
    if (newCheckbox1State) {
      setCheckbox2({ ...checkbox2, isChecked: false });
      setSelectedCheckboxId(checkbox1.id);
    } else {
      setSelectedCheckboxId(null);
    }
  };

  const handleCheckbox2Press = () => {
    const newCheckbox2State = !checkbox2.isChecked;
    setCheckbox2({ ...checkbox2, isChecked: newCheckbox2State });
    if (newCheckbox2State) {
      setCheckbox1({ ...checkbox1, isChecked: false });
      setSelectedCheckboxId(checkbox2.id);
    } else {
      setSelectedCheckboxId(null);
    }
  };

  const handleNextBtnPress = useCallback(() => {
    if (selectedCheckboxId) {
      if (selectedCheckboxId === 1) {
        navigation.navigate("DoctorAuthScreen");
      } else {
        navigation.navigate("UsernameAndPasswordScreen", { profession: null });
      }
    } else {
      Alert.alert("Veuillez cocher la case appropriée...");
    }
  }, [selectedCheckboxId, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Êtes-vous un personnel de santé ?</Text>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxItem}>
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.accent600}
              disableText
              innerIconStyle={{ borderWidth: 2 }}
              isChecked={checkbox1.isChecked}
              onPress={handleCheckbox1Press}
            />
            <Pressable onPress={handleCheckbox1Press}>
              <Text style={styles.checkboxText}>
                Oui, je suis un personnel de santé (Gynécologue, sage femme)
              </Text>
            </Pressable>
          </View>
          <View style={styles.checkboxItem}>
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.accent600}
              disableText
              innerIconStyle={{ borderWidth: 2 }}
              isChecked={checkbox2.isChecked}
              onPress={handleCheckbox2Press}
            />
            <Pressable onPress={handleCheckbox2Press}>
              <Text style={styles.checkboxText}>
                Non, je ne suis qu'un simple utilisateur
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.btnBox}>
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
  content: {
    position: "absolute",
    top: 100,
    gap: 120,
  },
  title: {
    fontSize: RFValue(SIZES.xxLarge),
    fontFamily: "Bold",
    textAlign: "center",
    marginHorizontal: 20,
  },
  btnBox: {
    position: "absolute",
    bottom: 10,
    marginLeft: 20,
    marginBottom: 30,
  },
  checkboxContainer: {
    gap: 30,
  },
  checkboxItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  checkboxText: {
    fontFamily: "Regular",
    lineHeight: 24,
    fontSize: RFValue(SIZES.medium),
  },
});

export default PersonalHealthTestScreen;
