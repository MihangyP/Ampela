import { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../components/theme-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SIZES, COLORS } from "../../../constants";
import i18n from "../../i18n";
import HeaderWithGoBack from "../../components/header-with-go-back";

const ChangeLanguageScreen = ({ navigation }) => {
  const language = i18n.language;
  const { theme } = useContext(ThemeContext);
  const [checkboxState, setCheckboxState] = useState(true);
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
 
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "pink" ? COLORS.neutral200 : COLORS.neutral100,
        },
      ]}
    >
      <HeaderWithGoBack title="Langues" navigation={navigation} />
      <TouchableOpacity style={{backgroundColor: COLORS.accent600, borderRadius: 5, alignItems: "center", justifyContent: "center" , marginBottom: 20, marginTop: 100, padding: 10}} onPress={() => changeLanguage("mg")}>
        <Text style={{color: COLORS.neutral100, fontFamily: "SBold"}}>Malagasy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: COLORS.accent600, borderRadius: 5 , alignItems: "center", justifyContent: "center", padding: 10}}  onPress={() => changeLanguage("fr")}>
        <Text style={{color: COLORS.neutral100, fontFamily: "SBold"}}>Français</Text>
      </TouchableOpacity>  
      
            {/* <View style={styles.content}>
                <View style={styles.flex}>
                    <Text style={styles.medium}>Français</Text>
                    <View>
                        <BouncyCheckbox 
                             size={25}
                             fillColor={theme === 'pink' ? COLORS.accent600 : COLORS.accent800}
                             disableText
                             innerIconStyle={{ borderWidth: 2 }}
                             isChecked={checkboxState}
                             onPress={handleCheckBoxChange}
                        />
                    </View>
                </View>
                 <View style={styles.flex}>
                <Text style={styles.medium}>Malagasy</Text>
                    <View>
                        <BouncyCheckbox 
                            size={25}
                            fillColor={theme === 'pink' ? COLORS.accent600 : COLORS.accent800}
                            disableText
                            innerIconStyle={{ borderWidth: 2 }}
                        />
                    </View>
                </View> 
            </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medium: {
    fontFamily: "Medium",
    fontSize: SIZES.medium,
  },
  content: {
    marginTop: 100,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
});

export default ChangeLanguageScreen;
