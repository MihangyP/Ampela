import { useState, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { ThemeContext } from "./theme-context";
import { RFValue } from "react-native-responsive-fontsize";

const screenWidth = Dimensions.get("window").width;

const ReminderContent = ({ onCloseIconPress, pills, type, onRegisterButtonPress }) => {
  const { theme } = useContext(ThemeContext);
  const [active, setActive] = useState("");
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const hours = Array.from({ length: 24 }, (_, index) => index);
  const minutes = Array.from({ length: 60 } , (_, index) => index);

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  }

  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);
  }

  const handleItemPress = (item) => {
    if (active === item) {
      setActive("");
    } else {
      setActive(item);
    };
  };

  const handleRegisterBtnPress = () => {
    onRegisterButtonPress(type, selectedHour, selectedMinute, active);
  }

  return (
    <View style={styles.container} className="fixed -top-[250px]">
      <View style={styles.header}>
        <Text style={[styles.textRegular, { textAlign: "center" }]}>
          Début des règles
        </Text>
      </View>

      <View style={styles.body}>
        {/* here */}
        <View style={styles.timeContainer}>
            <ScrollView style={{height: 50}}
              showsVerticalScrollIndicator={false}
            >
              {
                hours.map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    onPress={() => handleHourSelect(hour)}
                    style={[styles.timeOption, selectedHour === hour && styles.selectedOption]}
                  >
                      <Text style={styles.timeText}>{hour < 10 ? `0${hour}` : hour}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
            <Text style={styles.timeDivider}>:</Text>
            <ScrollView style={{height: 50}}
              showsVerticalScrollIndicator={false}
            > 
              {
                minutes.map((minute) => (
                  <TouchableOpacity
                    key={minute}
                    onPress={() => handleMinuteSelect(minute)}
                    style={[styles.timeOption, selectedMinute === minute && styles.selectedOption]}
                  >
                      <Text style={styles.timeText}>{minute < 10 ? `0${minute}` : minute}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
        </View>

      </View>

      <View style={styles.footer}>
        <Text style={styles.textRegular}>Répéter : </Text>
        <View style={styles.pressableContainer}>
          <Pressable
            style={[
              styles.item,
              {
                backgroundColor:
                  active === "Ajourd'hui" || active === "3 jours" ? (theme === 'pink' ? COLORS.accent600 : COLORS.accent800) : "rgba(0, 0, 0, 0.1)",
              }
            ]}
            onPress={() => handleItemPress(pills ? "Aujourd'hui" : "3 jours")}
          >
            <Text
              style={[
                styles.itemText,
                {
                  color:
                    active === "Aujourd'hui" || active === "3 jours" ? COLORS.neutral100 : COLORS.neutral400,
                },
              ]}
            >
              {pills === true ? "Ajourd'hui" : "3 jours"}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.item,
              {
                backgroundColor:
                  active === "Tous les jours" || active === "2 jours" ? (theme === 'pink' ? COLORS.accent600 : COLORS.accent800) : "rgba(0, 0, 0, 0.1)",
              },
            ]}
            onPress={() => handleItemPress(pills ? "Tous les jours" : "2 jours")}
          >
            <Text
              style={[
                styles.itemText,
                {
                  color:
                    active === "Tous les jours" || active === "2 jours" ? COLORS.neutral100 : COLORS.neutral400,
                },
              ]}
            >
              {pills === true ? "Tous les jours " : "2 jours"}
            </Text>
          </Pressable>
          {pills === true ? null : (
            <>
              <Pressable
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      active === "1 jour"
                        ? (theme === 'pink' ? COLORS.accent600 : COLORS.accent800)
                        : "rgba(0, 0, 0, 0.1)",
                  }
                ]}
                onPress={() => handleItemPress("1 jour")}
              >
                <Text
                  style={[
                    styles.itemText,
                    {
                      color:
                        active === "1 jour"
                          ? COLORS.neutral100
                          : COLORS.neutral400,
                    },
                  ]}
                >
                  1 jour
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      active === "Le jour même"
                        ? (theme === 'pink' ? COLORS.accent600 : COLORS.accent800)
                        : "rgba(0, 0, 0, 0.1)",
                  },
                ]}
                onPress={() => handleItemPress("Le jour même")}
              >
                <Text
                  style={[
                    styles.itemText,
                    {
                      color:
                        active === "Le jour même"
                          ? COLORS.neutral100
                          : COLORS.neutral400,
                    },
                  ]}
                >
                  Le jour même
                </Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 15 }}>
          <Pressable onPress={handleRegisterBtnPress} style={{ alignItems: "center", justifyContent: "center", borderRadius: 30, backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800, paddingVertical: 8, width: 120 }}>
            <Text style={{ fontFamily: "Medium", color: COLORS.neutral100 }}>Enregistrer</Text>
          </Pressable>
          <Pressable onPress={onCloseIconPress} style={{ alignItems: "center", justifyContent: "center", borderRadius: 30, backgroundColor: COLORS.neutral400, flexDirection: "row", paddingVertical: 8, width: 120 }}>
            <Text style={{ fontFamily: "Medium", color: COLORS.neutral100 }}>Annuler</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.neutral100,
    width: screenWidth - 40,
    borderRadius: 15,

  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150
  },
  timeOption: {
    paddingVertical: 10,
  },
  selectedOption: {
    backgroundColor: COLORS.neutral200,
    borderRadius: 5,
  },
  timeText: {
    fontSize: RFValue(SIZES.large),
    fontFamily: "Regular",
    textAlign: "center"
  },
  timeDivider: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
  },
  textRegular: {
    fontFamily: "Regular",
  },
  textMedium: {
    fontFamily: "Medium",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginVertical: 20,
  },
  pressableContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  itemText: {
    fontFamily: "Regular",
    fontSize: RFValue(SIZES.small)
  },

});

export default ReminderContent;
