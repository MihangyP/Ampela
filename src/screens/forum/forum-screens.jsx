import { useRef, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput
} from "react-native";
import { useTranslation } from "react-i18next";
import HeaderForum from "../../components/header-forum";
import ForumItem from "../../components/forum-item";
import { ThemeContext } from "../../components/theme-context";
import { COLORS, SIZES } from "../../../constants";
import BackgroundContainer from "../../components/background-container";
import { RFValue } from "react-native-responsive-fontsize";


const ForumScreen = ({navigation}) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const screenWidth = Dimensions.get("window").width + 200;
  const translateXAnim = useRef(new Animated.Value(screenWidth)).current;

  const handleAskQuestionBtnPress = () => {
    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelBtnPress = () => {
    Animated.timing(translateXAnim, {
      toValue: screenWidth,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }
  const handleSendBtnPress = () => {
    Animated.timing(translateXAnim, {
      toValue: screenWidth,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={styles.container}>
      <BackgroundContainer paddingBottom={85}>
      <Animated.View
        style={[
          styles.containerBox,
          {
            transform: [{ translateX: translateXAnim }],
          },
        ]}
      >
        <View style={styles.box}>
          <TextInput
             style={styles.askQuestionTextInput}
             placeholder="Posez ici vos questions sur les règles, la contraception, la planification familiale, etc..."
           />
          <View style={styles.btnBox}>
            <TouchableOpacity style={[styles.btnInsideBox, { backgroundColor: COLORS.neutral400 }]} onPress={handleCancelBtnPress} >
              <Text style={{ fontFamily: "Bold", color: COLORS.neutral100, fontSize: SIZES.small }}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnInsideBox, { backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800 }]} onPress={handleSendBtnPress}>
              <Text style={{ fontFamily: "Bold", color: COLORS.neutral100, fontSize: SIZES.small }}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <HeaderForum navigation={navigation} isDoctor={false} />
      <TouchableOpacity style={[styles.btn, { backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800 }]} onPress={handleAskQuestionBtnPress}>
        <Text style={styles.textBtn}>{t('posezVotreQuestion')}</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <ForumItem />
        <ForumItem />
        <ForumItem />
        <ForumItem />
      </ScrollView>
 
      </BackgroundContainer>
     
    </View>
  );
};

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: 30000,
  },
  box: {
    width: "90%",
    height: 316,
    backgroundColor: COLORS.neutral100,
    borderRadius: 10,
    marginTop: 90,
    marginLeft: "5%",
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  btnInsideBox: {
    width: 138,
    height: 44,
    alignItems:"center",
    justifyContent: "center",
    borderRadius: 99
  },
  askQuestionTextInput: {
    width: "90%",
    marginLeft: "5%",
    marginTop: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: 200,
    borderRadius: 10,
    fontFamily: "Medium",
    padding: 10, 
    
  },
  container: {
    flex: 1,
  },
  btn: {
    width: "100%",
    height: 44,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  textBtn: {
    color: COLORS.neutral100,
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.small),
  },
});

export default ForumScreen;
