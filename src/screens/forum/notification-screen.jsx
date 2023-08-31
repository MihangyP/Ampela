import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderWithGoBack from "../../components/header-with-go-back";
import Button from "../../components/button";
import { useTranslation } from "react-i18next";
// import { ThemeContext } from "../../components/theme-context";
import { ThemeContext } from "../../components/theme-context";
import { COLORS } from "../../../constants";
import BackgroundContainer from "../../components/background-container";

const NotificationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <BackgroundContainer>
        <HeaderWithGoBack navigation={navigation} title={t("notifications")} />
        <View style={{ marginVertical: 20 }}>
          <Button
            bgColor={theme === "pink" ? COLORS.accent600 : COLORS.accent800}
            textColor={COLORS.neutral100}
            borderRadius={99}
          >
            {t("supprimerTout")}
          </Button>
        </View>
      </BackgroundContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NotificationScreen;
