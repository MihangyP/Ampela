import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/button";
import { useTranslation } from "react-i18next";
import { COLORS, SIZES } from "../../../constants";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { RFValue } from "react-native-responsive-fontsize";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Di.", "Lu.", "Ma.", "Me.", "Je.", "Ve.", "Sa."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

const LastMenstrualCycleStartAge = ({ navigation, route }) => {
  const [selected, setSelected] = useState("");
  const { t } = useTranslation();
  const { user } = route.params;

  const handleBtnPress = useCallback(() => {
    navigation.navigate("QuestionsSeries", {
      user: {
        selected,
        nomDutilisateur: user.nomDutilisateur,
        motDePasse: user.motDePasse,
        profession: user.profession,
      },
    });
  }, [navigation]);

  const handleDayPressed = useCallback(
    (date) => {
      setSelected(date);
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("questionDateVosDernieresRegles")}</Text>
      <View style={styles.calendar}>
        <Calendar
          style={{
            height: 360,
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, .5)",
          }}
          theme={{
            textSectionTitleColor: COLORS.neutral400,
            todayTextColor: COLORS.primary,
            dayTextColor: "#2d4150",
            textDisabledColor: COLORS.neutral400,
            arrowColor: COLORS.primary,
            monthTextColor: COLORS.primary,
            textDayFontFamily: "Regular",
            textMonthFontFamily: "Bold",
            textDayHeaderFontFamily: "Regular",
            textDayFontSize: SIZES.medium,
            textMonthFontSize: SIZES.large,
            textDayHeaderFontSize: SIZES.medium,
          }}
          onDayPress={(day) => {
            handleDayPressed(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: COLORS.accent400,
              selectedTextColor: COLORS.neutral100,
            },
          }}
        />
      </View>
      <View style={styles.btnBox}>
        <Button
          bgColor={COLORS.neutral100}
          textColor={COLORS.accent600}
          onPress={handleBtnPress}
        >
          {t("jeMenSouviensPas")}
        </Button>
        <Button
          bgColor={COLORS.accent600}
          textColor={COLORS.neutral100}
          borderRadius={15}
          onPress={handleBtnPress}
        >
          {t("suivant")}
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
    fontSize: RFValue(SIZES.xLarge),
    marginTop: "30%",
    paddingHorizontal: 20,
  },
  calendar: {
    marginTop: RFValue(50),
  },
  btnBox: {
    position: "absolute",
    bottom: 30,
    marginLeft: 20,
  },
});

export default LastMenstrualCycleStartAge;