import { useContext, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ThemeContext } from "../../components/theme-context";
import { SIZES, COLORS, images } from "../../../constants";
import i18n from "../../i18n";
import HeaderWithGoBack from "../../components/header-with-go-back";

const ChangeLanguageScreen = ({ navigation }) => {
  const language = i18n.language;
  const { theme } = useContext(ThemeContext);
  const changeLanguage = useCallback((language) => {
    i18n.changeLanguage(language);
  }, []);
   
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
      <View style={{gap: 20, marginTop: 20}}>
            <TouchableOpacity style={{backgroundColor: theme === 'pink' ? (language === "mg" ? "rgba(226,68,92, .8)" : "rgba(226,68,92, .4)") : (language === "mg" ? "rgba(254,135,41, .8)" : "rgba(254,135,41, .4)"), borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, padding: 10}} onPress={() => changeLanguage("mg")}>      
              <Text style={{color: COLORS.neutral100, fontFamily: "SBold"}}>Malagasy</Text>
              <Image source={images.madaImg} style={{width: 30, height: 20, borderRadius: 5}} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: theme === 'pink' ? (language === "fr" ? "rgba(226,68,92, .8)" : "rgba(226,68,92, .4)") : (language === "fr" ? "rgba(254,135,41, .8)" : "rgba(254,135,41, .4)"), borderRadius: 5 , flexDirection: "row", alignItems: "center", justifyContent: "space-between",gap: 10, padding: 10}}  onPress={() => changeLanguage("fr")}>
              <Text style={{color: COLORS.neutral100, fontFamily: "SBold"}}>Français</Text>
              <Image source={images.franceImg} style={{width: 30, height: 20, borderRadius: 5}} />
            </TouchableOpacity>
      </View>
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
