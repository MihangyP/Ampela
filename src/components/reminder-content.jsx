import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import { ThemeContext } from "./theme-context";
import { RFValue } from "react-native-responsive-fontsize";
import CustomScrollPicker from "./CustomScrollPicker";

const screenWidth = Dimensions.get("window").width;

const ReminderContent = ({ onCloseIconPress, pills, type, onRegisterButtonPress }) => {
  const {theme} = useContext(ThemeContext);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [active, setActive] = useState("");
  const handleItemPress = (item) => {
    if (active === item) {
      setActive("");
    } else {
      setActive(item);
    };
  };
  const handleBtnTopOnePress = () => {
    if(number1 > 22) {
        setNumber1(0);
    } else {
        setNumber1(n => n + 1);
    }
  }
  const handleBtnBottomOnePress = () => {
    if(number1 < 1) {
       setNumber1(23) 
    } else {
        setNumber1(n => n - 1);
    }
  }
  const handleBtnTopTwoPress = () => {
    if(number2 > 58) {
        setNumber2(0);
    } else {
        setNumber2(n => n + 1);
    }
  }
  const handleBtnBottomTwoPress = () => {
    if(number2 < 1) {
       setNumber2(59) 
    } else {
        setNumber2(n => n - 1);
    }
  }

  const handleRegisterBtnPress = () => {
    onRegisterButtonPress(type, number1, number2, active);
  }
  return (
    <View style={styles.container} className="fixed -top-[250px]">
      <View style={styles.header}>
        <Text style={[styles.textRegular, { textAlign: "center" }]}>
          Début des règles
        </Text>
      </View>
      <View style={styles.body}>

        {/* Heure scrollable */}
        <View style={styles.gap}>
         <CustomScrollPicker/>
        </View>

        <View>
          <Text style={styles.number}>:</Text>
        </View>

        {/* Minute scrollable */}
        <View style={styles.gap}>
        <CustomScrollPicker/>
       
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
        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 15 }}>
          <Pressable onPress={handleRegisterBtnPress} style={{alignItems: "center", justifyContent: "center", borderRadius: 30 ,backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800, paddingVertical: 8, width: 120}}>
             <Text style={{fontFamily: "Medium", color: COLORS.neutral100}}>Enregistrer</Text>
          </Pressable>
          <Pressable onPress={onCloseIconPress} style={{alignItems: "center", justifyContent: "center", borderRadius: 30, backgroundColor: COLORS.neutral400 , flexDirection: "row", paddingVertical: 8, width: 120}}>
             <Text style={{fontFamily: "Medium", color: COLORS.neutral100}}>Annuler</Text>
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
  gap: {
    gap: 15,
    alignItems: "center",
  },
  number: {
    fontSize: RFValue(SIZES.large),
    fontFamily: "Medium"
  }
});

export default ReminderContent;
