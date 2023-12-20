import { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from "react-native";
import { ThemeContext } from "../../components/theme-context";
import { useTranslation } from "react-i18next";
import { COLORS, SIZES } from "../../../constants";
import ReminderContent from "../../components/reminder-content";
import BackgroundContainer from "../../components/background-container";
import IndicationCalendar from "../../components/calendar/indication-calendar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import ReminderItem from "../../components/calendar/reminder-item";
import { RFValue } from "react-native-responsive-fontsize";
import AuthWithGoogle from "../../components/authWithGoogle/authWithGoogle";
import { getMenstruationData } from "../../../config/databaseLocalConfig";
import db from "../../../config/databaseInstance";
import { getMenstruationPeriod, getFecundityPeriod, getOvulationDate } from "../../components/utils/menstruationUtils";
import moment from "moment";

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

// LocaleConfig.locales["mg"] = {
//   monthNames: [
//     "Janoary",
//     "Febroary",
//     "Martsa",
//     "Aprily",
//     "May",
//     "Jona",
//     "Jolay",
//     "Aogositra",
//     "Septambra",
//     "Oktobra",
//     "Novambra",
//     "Desambra",
//   ],
//   monthNamesShort: [
//     "Jan.",
//     "Febr.",
//     "Mar.",
//     "Apr.",
//     "May",
//     "Jona",
//     "Jolay.",
//     "Aogo.",
//     "Sept.",
//     "Oct.",
//     "Nov.",
//     "Des.",
//   ],
//   dayNames: [
//     "Alahady",
//     "Alatsinainy",
//     "Talata",
//     "Alarobia",
//     "Alakamisy",
//     "Zoma",
//     "Sabotsy",
//   ],
//   dayNamesShort: ["Alh.", "Alt.", "Tal.", "Alr.", "Alk.", "Zo.", "Sa."],
//   today: "Androany",
// };

LocaleConfig.defaultLocale = "fr";

const CalendarScreen = () => {
  const [translateYOne, setTranslateYOne] = useState(1500);
  const [translateYTwo, setTranslateYTwo] = useState(1500);
  const [translateYThree, setTranslateYThree] = useState(1500);
  const [howmanytimeReminder1, setHowmanytimeReminder1] = useState("?");
  const [howmanytimeReminder2, setHowmanytimeReminder2] = useState("?");
  const [howmanytimeReminder3, setHowmanytimeReminder3] = useState("?");
  const [scrollDisabled, setScrollDisabled] = useState(true);

  const [time1, setTime1] = useState({
    hour: 0,
    minutes: 0
  })
  const [time2, setTime2] = useState({
    hour: 0,
    minutes: 0
  })
  const [time3, setTime3] = useState({
    hour: 0,
    minutes: 0
  })
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  //to fix
  const handleReminderBtnOnePress = useCallback(() => {
    setScrollDisabled(false);
    setTranslateYOne(0);
  }, []);
  const handleReminderBtnTwoPress = useCallback(() => {
    setScrollDisabled(false);
    setTranslateYTwo(0);
  }, []);
  const handleReminderBtnThreePress = useCallback(() => {
    setScrollDisabled(false);
    setTranslateYThree(0);
  }, []);

  const handleCloseIconOnePress = useCallback(() => {
    setScrollDisabled(true);
    setTranslateYOne(1500);
  }, []);
  const handleCloseIconTwoPress = useCallback(() => {
    setScrollDisabled(true);
    setTranslateYTwo(1500);
  }, []);
  const handleCloseIconThreePress = useCallback(() => {
    setScrollDisabled(true);
    setTranslateYThree(1500);
  });

  const handleRegisterButtonPress = useCallback((type, hour, minutes, active) => {
    setScrollDisabled(true);
    switch (type) {
      case "Début des règles":
        setTime1({ ...time1, hour: hour, minutes: minutes });
        setHowmanytimeReminder1(active);
        setTranslateYOne(1500);
        break;
      case "Jour d'ovulation":
        setTime2({ ...time2, hour: hour, minutes: minutes });
        setHowmanytimeReminder2(active);
        setTranslateYTwo(1500);
        break;
      case "Prise de pillule":
        setTime3({ ...time3, hour: hour, minutes: minutes })
        setHowmanytimeReminder3(active);
        setTranslateYThree(1500);
        break;
      default:
        return null;
    }
  }, []);


  const lastMentrualPeriodStartDate = "2023-11-21";
  const cycleDurations = 28;
  const menstruationDurations = 5;
  const [markedDates, setMarkedDates] = useState({});

  const [currentOvulationDate, setCurrentOvulationDate] = useState('');
  const [currentStartFecondityDate, setCurrentStartFecondityDate] = useState('');
  const [currentEndFecondityDate, setCurrentEndFecondityDate] = useState('');
  const [currentNextMenstruationDate, setCurrentNextMenstruationDate] = useState('');
  const [currentNextMenstruationEndDate, setCurrentNextMenstruationEndDate] = useState('');

  useEffect(() => {
    const { ovulationDate } = getOvulationDate(lastMentrualPeriodStartDate, cycleDurations, menstruationDurations);
    const { startFecondityDate, endFecondityDate } = getFecundityPeriod(lastMentrualPeriodStartDate, cycleDurations);
    const { nextMenstruationDate, nextMenstruationEndDate } = getMenstruationPeriod(lastMentrualPeriodStartDate, cycleDurations, menstruationDurations);

    setCurrentOvulationDate(ovulationDate);
    setCurrentStartFecondityDate(startFecondityDate);
    setCurrentEndFecondityDate(endFecondityDate);
    setCurrentNextMenstruationDate(nextMenstruationDate);
    setCurrentNextMenstruationEndDate(nextMenstruationEndDate);
  }, [lastMentrualPeriodStartDate, cycleDurations, menstruationDurations]);

  const newMarkedDates = { ...markedDates };
  useEffect(() => {
    const handleMenstruationPeriod = () => {
      for (let i = 0; i < menstruationDurations; i++) {

        newMarkedDates[moment(lastMentrualPeriodStartDate).add(i, "days").format("YYYY-MM-DD")] = {
          customStyles: {
            container: {
              backgroundColor: "#FFADAD"
            },
            text: {
              color: "#fff"
            }
          }
        };
      }

      for (let i = 0; i < menstruationDurations; i++) {
        //.log("MENSTRUATION : ", moment(nextMenstruationDate).add(i, "days").format("YYYY-MM-DD"));
        newMarkedDates[moment(currentNextMenstruationDate).add(i, "days").format("YYYY-MM-DD")] = {
          customStyles: {
            container: {
              backgroundColor: "#FFADAD"
            },
            text: {
              color: "#fff"
            }
          }
        };
      }
    };

    //.log("YES YES yES");
    const handleFecondityPeriod = () => {

      const startFecondityDay = parseInt(currentStartFecondityDate.split("-")[2], 10);
      const ovulationDay = parseInt(currentOvulationDate.split('-')[2], 10);
      const startFecondityMoment = moment(currentStartFecondityDate);

      let i = startFecondityDay;
      let j = 0;

      while (j <= 7) {
        if (i !== ovulationDay) {
          newMarkedDates[startFecondityMoment.format("YYYY-MM-DD")] = {
            customStyles: {
              container: {
                backgroundColor: "#E2445C"
              },
              text: {
                color: "#fff"
              }
            }
          };
        }

        if (j === 5) {
          newMarkedDates[currentOvulationDate] = {
            customStyles: {
              container: {
                borderStyle: "solid",
                borderColor: "#E2445C",
                borderWidth: 2,
              },
              text: {
                color: "#000"
              }
            }
          };
        }
        startFecondityMoment.add(1, "days");
        i++;
        j++;
      }
    };

    handleMenstruationPeriod();
    handleFecondityPeriod();


    setMarkedDates(newMarkedDates);

  }, [currentNextMenstruationDate, currentNextMenstruationEndDate, currentStartFecondityDate, currentOvulationDate]);


  // Event de bascule entre ls mois du calendar
  const handleMonthChange = (month) => {
    // month.dateString
    const lastMentruation = moment(currentOvulationDate).add(14, "days").format('YYYY-MM-DD');
    // const isGoingForward = currentDate.isAfter(moment(currentNextMenstruationDate));


    const { ovulationDate } = getOvulationDate(lastMentruation, cycleDurations, menstruationDurations);
    const { startFecondityDate, endFecondityDate } = getFecundityPeriod(lastMentruation, cycleDurations);
    const { nextMenstruationDate, nextMenstruationEndDate } = getMenstruationPeriod(lastMentruation, cycleDurations, menstruationDurations);

    console.log("DATE D'OVULATION DU CYCLE SUIVANTE :", ovulationDate);
    console.log("DATE ACTUEL DU CURRENT MOIS : ", lastMentruation);

    setCurrentOvulationDate(ovulationDate);
    setCurrentStartFecondityDate(startFecondityDate);
    setCurrentEndFecondityDate(endFecondityDate);
    setCurrentNextMenstruationDate(nextMenstruationDate);
    setCurrentNextMenstruationEndDate(nextMenstruationEndDate);

    console.log(curr)

    const newMarkedDatesCopy = calculateMarkedDates(
      nextMenstruationDate,
      nextMenstruationEndDate,
      ovulationDate,
      startFecondityDate
    );

    setMarkedDates(newMarkedDatesCopy);
  };

  const calculateMarkedDates = (
    nextMenstruationDate,
    nextMenstruationEndDate,
    ovulationDate,
    startFecondityDate
  ) => {
    const newMarkedDatesCopy = {};

    for (let i = 0; i <= moment(nextMenstruationEndDate).diff(nextMenstruationDate, 'days'); i++) {
      const currentDate = moment(nextMenstruationDate).add(i, 'days').format('YYYY-MM-DD');
      newMarkedDatesCopy[currentDate] = {
        customStyles: {
          container: {
            backgroundColor: '#FFADAD',
          },
          text: {
            color: '#fff',
          },
        },
      };
    }

    const startFecondityMoment = moment(startFecondityDate);
    for (let j = 0; j < 7; j++) {
      if (j !== 4) {
        const currentDate = startFecondityMoment.format('YYYY-MM-DD');
        newMarkedDatesCopy[currentDate] = {
          customStyles: {
            container: {
              backgroundColor: '#E2445C',
            },
            text: {
              color: '#fff',
            },
          },
        };
      }
      startFecondityMoment.add(1, 'days');
    }

    newMarkedDatesCopy[ovulationDate] = {
      customStyles: {
        container: {
          borderStyle: 'solid',
          borderColor: '#E2445C',
          borderWidth: 2,
        },
        text: {
          color: '#000',
        },
      },
    };

    return newMarkedDatesCopy;
  };

  return (
    <>
      <ScrollView scrollEnabled={scrollDisabled} style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.authwithgoogleContainer}>
          <AuthWithGoogle />
        </View>
        <BackgroundContainer>

          <Text style={styles.title}>{t("calendrier")}</Text>
          <View style={styles.calendar}>
            <Calendar

              style={{
                height: 380,
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, .5)",
              }}
              theme={{
                textSectio0nTitleColor: COLORS.neutral400,
                todayTextColor: COLORS.primary,
                dayTextColor: "#2d4150",
                textDisabledColor: COLORS.neutral400,
                arrowColor: COLORS.primary,
                monthTextColor: COLORS.primary,
                textDayFontFamily: "Regular",
                textMonthFontFamily: "SBold",
                textDayHeaderFontFamily: "Regular",
                textDayFontSize: SIZES.medium,
                textMonthFontSize: SIZES.large,
                textDayHeaderFontSize: SIZES.medium,
              }}
              onDayPress={(day) => {
                // //.log(day.dateString);
              }}
              enableSwipeMonths={true}
              onMonthChange={(month) => handleMonthChange(month)}
              markingType="custom"
              markedDates={newMarkedDates}
            />
          </View>
          <View style={styles.indications}>
            <IndicationCalendar title="Jours des règles" />
            <IndicationCalendar title="Ovulation" />
            <IndicationCalendar title="Période de fécondité" />
          </View>
          <View style={[styles.reminder, { backgroundColor: theme === 'pink' ? "rgba(255, 255, 255, .5)" : "rgba(238, 220, 174, .5)" }]}>
            <Text style={styles.reminderTitle}>{t('rappels')}</Text>
            <View
              style={{
                gap: 10,
              }}
            >
              <ReminderItem as="Début des règles" onPress={handleReminderBtnOnePress} time={time1} howmanytimeReminder={howmanytimeReminder1} />
              <ReminderItem as="Jour d'ovulation" onPress={handleReminderBtnTwoPress} time={time2} howmanytimeReminder={howmanytimeReminder2} />
              <ReminderItem as="Prise de pillule" onPress={handleReminderBtnThreePress} time={time3} howmanytimeReminder={howmanytimeReminder3} />
            </View>
          </View>
        </BackgroundContainer>
      </ScrollView>
      <View
        style={[
          styles.reminderContainer,
          {
            transform: [
              // to fix
              { translateY: translateYOne },
            ],
          },
        ]}


      >
        <ReminderContent onCloseIconPress={handleCloseIconOnePress} pills={false} type="Début des règles" onRegisterButtonPress={handleRegisterButtonPress} />
      </View>
      <View
        style={[
          styles.reminderContainer,
          {
            transform: [
              // to fix
              { translateY: translateYTwo },
            ],
          },
        ]}
      >
        <ReminderContent onCloseIconPress={handleCloseIconTwoPress} pills={false} type="Jour d'ovulation" onRegisterButtonPress={handleRegisterButtonPress} />
      </View>
      <View
        style={[
          styles.reminderContainer,
          {
            transform: [
              // to fix
              { translateY: translateYThree },
            ],
          },
        ]}
      >
        <ReminderContent onCloseIconPress={handleCloseIconThreePress} pills={true} type="Prise de pillule" onRegisterButtonPress={handleRegisterButtonPress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  authwithgoogleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1
  },
  reminderContainer: {
    position: "absolute",
    alignItems: "center",
    paddingTop: "95%",
    // justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .3)",
    top: 0,
    right: -20,
    left: -20,
    bottom: 0,
    zIndex: 999,
  },
  title: {
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.xLarge),
    textAlign: "center",
    marginTop: 60,
  },
  calendar: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  indications: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
  },
  reminderTitle: {
    fontFamily: "SBold",
    fontSize: RFValue(SIZES.large),
    marginBottom: 20,
  },
  reminder: {
    marginTop: 20,
    marginBottom: 100,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8
  },
});

export default CalendarScreen;
