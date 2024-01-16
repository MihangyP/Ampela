import { useState, useRef, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  Linking
} from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../components/theme-context";
import SettingItem from "../../components/setting-item";
import { COLORS, SIZES, images, icons } from "../../../constants";
import BackgroundContainer from "../../components/background-container";
import { RFValue } from "react-native-responsive-fontsize";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";

const EmailButton = ({text, urlIcon}) => {
  const openEmailApp = () => {
    Linking.openURL(`mailto:ampela.mg.dev@gmail.com?subject=${text}`);
  };

  return (
    <Pressable onPress={openEmailApp} style={{flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Image source={urlIcon}  style={{width: 20, height: 20}} />
      <Text style={{fontFamily: 'Regular', fontSize: SIZES.medium}}>{text}</Text>
    </Pressable>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const screenHeight = Dimensions.get("window").height;
  const translateYAnim = useRef(new Animated.Value(screenHeight + 1000)).current;
  const anotherTranslateYAnim = useRef(new Animated.Value(400)).current;
  const anotherOneTranslateYAnim = useRef(
    new Animated.Value(screenHeight + 1000)
  ).current;
  const anotherTwoTranslateYAnim = useRef(
    new Animated.Value(screenHeight + 1000)
  ).current;
  const handleSharingPress = () => {
    Animated.sequence([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(anotherTranslateYAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSharingBodyPress = () => {
    Animated.sequence([
      Animated.timing(translateYAnim, {
        toValue: screenHeight + 1000,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(anotherTranslateYAnim, {
        toValue: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleReinitialisationBtnPress = () => {
    setScrollEnabled(false);
    Animated.timing(anotherOneTranslateYAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelBtnPress = () => {
    setScrollEnabled(true);
    Animated.timing(anotherOneTranslateYAnim, {
      toValue: screenHeight + 1000,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  const handleConfirmBtnPress = () => {
    setScrollEnabled(true);
    Animated.timing(anotherOneTranslateYAnim, {
      toValue: screenHeight + 1000,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleLogOutBtnPress = () => {
    setScrollEnabled(false);
    Animated.timing(anotherTwoTranslateYAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelLogOutBtnPress = () => {
    setScrollEnabled(true);
    Animated.timing(anotherTwoTranslateYAnim, {
      toValue: screenHeight + 1000,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  const handleConfirmLogOutBtnPress = () => {
    setScrollEnabled(true);
    signOut(auth)
      .then(() => {
        Animated.timing(anotherTwoTranslateYAnim, {
          toValue: screenHeight + 1000,
          duration: 0,
          useNativeDriver: true,
        }).start();
        navigation.navigate('LogInScreen')
      })
      .catch((error) => {

        console.error("Erreur lors de la déconnexion : ", error);
      });
  };

  return (
    <ScrollView scrollEnabled={scrollEnabled} style={styles.container} showsVerticalScrollIndicator={false}>
      <BackgroundContainer>

        <Text style={styles.title}>{t("parametre")}</Text>

        <View style={styles.profilContainer}>
          <Image source={images.user06} resizeMode="contain" />
          <Text style={{ fontFamily: "Medium" }}>Charline Bukowski</Text>
        </View>
        <View style={styles.settingsContent}>
          <View>
            <Text style={styles.subtitle}>{t('compte')}</Text>
            <View style={{ marginLeft: 15, marginTop: 10, gap: 15 }}>
              <SettingItem
                title={t('compte')}
                urlIcon={icons.user}
                chevronRight={true}
                navigation={navigation}
                routeToNavigate="AccountScreen"
              />
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={handleLogOutBtnPress}
              >
                <View style={styles.left}>
                  <Image source={icons.logOut} style={styles.settingIcon} />
                  <Text style={styles.settingTitle}>{t("deconnexion")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>{t('general')}</Text>
            <View style={{ marginLeft: 15, marginTop: 10, gap: 15 }}>
              <SettingItem
                title={t("langues")}
                urlIcon={icons.language}
                chevronRight={true}
                navigation={navigation}
                routeToNavigate="ChangeLanguageScreen"
              />
              <SettingItem
                title={t("theme")}
                urlIcon={icons.themeIcon}
                chevronRight={true}
                navigation={navigation}
                routeToNavigate="ThemeScreen"
              />
              <SettingItem
                title={t("faq")}
                urlIcon={icons.question}
                chevronRight={true}
                navigation={navigation}
                routeToNavigate="FaqScreen"
              />
              <SettingItem
                title={t("infoAmpela")}
                urlIcon={icons.info}
                chevronRight={true}
                navigation={navigation}
                routeToNavigate="InfoScreen"
              />
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={handleSharingPress}
              >
                <View style={styles.left}>
                  <Image source={icons.sharing} style={styles.settingIcon} />
                  <Text style={styles.settingTitle}>{t("partager")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={handleReinitialisationBtnPress}
              >
                <View style={styles.left}>
                  <Image source={icons.refresh} style={styles.settingIcon} />
                  <Text style={styles.settingTitle}>
                    {t("reinitialisation")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>{t('feedback')}</Text>
            <View style={{ marginLeft: 15, marginTop: 10, gap: 15, paddingBottom: 90 }}>       
              <EmailButton text="Rapport de bug" urlIcon={icons.question}/>
              <EmailButton text="Envoyer des feedbacks" urlIcon={icons.send}/>
            </View>
          </View>
        </View>
        <Animated.View
          style={[
            styles.sharingBody,
            {
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.sharingContent,
              {
                transform: [{ translateY: anotherTranslateYAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSharingBodyPress}
            >
              <Text>Annuler</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            styles.reinitialisationBody,
            {
              transform: [{ translateY: anotherOneTranslateYAnim }],
            },
          ]}
        >
          <View style={styles.reinitialisationContent}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 99,
                backgroundColor:
                  theme === "pink" ? COLORS.neutral200 : COLORS.neutral250,
                width: 50,
                height: 50,
                marginLeft: "50%",
                transform: [{ translateX: -25 }],
                marginVertical: 15,
              }}
            >
              <Image source={icons.refresh} style={{ width: 20, height: 20 }} />
            </View>
            <Text
              style={{
                fontFamily: "Medium",
                textAlign: "center",
                fontSize: RFValue(SIZES.small),
                lineHeight: 20,
              }}
            >
              Êtes-vous sûr(e) de vouloir{" "}
              <Text
                style={{
                  color: theme === "pink" ? COLORS.accent600 : COLORS.accent800,
                }}
              >
                réinitialiser
              </Text>{" "}
              les données ? Veuillez confirmer la réinitialisation en appuyant
              sur le bouton "Confirmer".
            </Text>
            <View style={styles.btnBox}>
              <TouchableOpacity
                onPress={handleCancelBtnPress}
                style={[styles.btn, { backgroundColor: COLORS.neutral300 }]}
              >
                <Text style={{ fontFamily: "Medium", fontSize: RFValue(SIZES.small) }}>
                  {t("annuler")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmBtnPress}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      theme === "pink" ? COLORS.accent600 : COLORS.accent800,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Medium",
                    fontSize: SIZES.small,
                    color: COLORS.neutral100,
                  }}
                >
                  {t("confirmer")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.reinitialisationBody,
            {
              transform: [{ translateY: anotherTwoTranslateYAnim }],
            },
          ]}
        >
          <View style={styles.reinitialisationContent}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 99,
                backgroundColor:
                  theme === "pink" ? COLORS.neutral200 : COLORS.neutral250,
                width: 50,
                height: 50,
                marginLeft: "50%",
                transform: [{ translateX: -25 }],
                marginVertical: 15,
              }}
            >
              <Image source={icons.logOut} style={{ width: 20, height: 20 }} />
            </View>
            <Text
              style={{
                fontFamily: "Medium",
                textAlign: "center",
                fontSize: RFValue(SIZES.small),
                lineHeight: 20,
                marginVertical: 20,
              }}
            >
              {t("voulezVousVraimentVousDeconnecter")}
            </Text>
            <View style={styles.btnBox}>
              <TouchableOpacity
                onPress={handleCancelLogOutBtnPress}
                style={[styles.btn, { backgroundColor: COLORS.neutral300 }]}
              >
                <Text style={{ fontFamily: "Medium", fontSize: RFValue(SIZES.small) }}>
                  {t("annuler")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmLogOutBtnPress}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      theme === "pink" ? COLORS.accent600 : COLORS.accent800,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Medium",
                    fontSize: RFValue(SIZES.small),
                    color: COLORS.neutral100,
                  }}
                >
                  {t("confirmer")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </BackgroundContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
  title: {
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.xLarge),
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    fontFamily: "Medium",
    fontSize: RFValue(SIZES.medium),
  },
  profilContainer: {
    alignItems: "center",
    gap: 20,
    marginTop: 40,
  },
  mainBtn: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  settingIcon: {
    width: 20,
    height: 20,
  },
  textBtn: {
    color: COLORS.neutral100,
    fontFamily: "Medium",
  },
  settingsContent: {
    marginTop: 20,
    gap: 30,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  settingTitle: {
    fontFamily: "Regular",
    fontSize: RFValue(SIZES.medium),
  },
  sharingBody: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  sharingContent: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.neutral100,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 9999999,
  },
  reinitialisationBody: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .3)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  reinitialisationContent: {
    width: "95%",
    marginHorizontal: "2.5%",
    height: 200,
    backgroundColor: COLORS.neutral100,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    width: 130,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default SettingsScreen;
