import { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Alert,
  Pressable
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dimensions } from "react-native";
import Button from "../../components/button";
import { images, COLORS, SIZES, FONT } from "../../../constants";
import Link from "../../components/link";
import { RFValue } from "react-native-responsive-fontsize";


const DiscoveryScreen = ({ navigation }) => {
  let bouncyCheckbox1Ref = null;
  let bouncyCheckbox2Ref = null;

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  let isAllChecked = false;
  if(checkbox1 === true && checkbox2 === true) {
    isAllChecked = true;
  }
 
  const screenHeight = Dimensions.get("window").height;
  const translateYAnim = useRef(
    new Animated.Value(Math.ceil(screenHeight) + 200)
  ).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 3000);0
  }, []);


  const handleNextBtnPress = useCallback(() => {
    if (isAllChecked) {
      navigation.navigate("PersonalHealthTestScreen");
    } else {
      Alert.alert("S'il vous plaît, veuiller cocher toutes les cases..");
    }
  });

  const handleAcceptAllBtnPress = useCallback(() => {
    if(checkbox1 === false) {
      bouncyCheckbox1Ref?.onPress();
    } 
    if(checkbox2 === false) {
      bouncyCheckbox2Ref?.onPress();
    } 
  });

  return (
    <View style={styles.container}>
      <Image source={images.logo2} style={styles.logo} resizeMode="contain" />
      <Animated.View
        style={[
          styles.confidentialityContainer,
          {
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
    
          <Text style={styles.confidentialityTitle}>Confidentialité</Text>
          <View style={styles.confidentialityContent}>
            <View style={styles.confidentialityItem}>
              <BouncyCheckbox
                ref={(ref) => (bouncyCheckbox1Ref = ref)}
                size={25}
                fillColor={COLORS.accent600}
                disableText
                iconStyle={{ borderRadius: 0 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
                isChecked={checkbox1}
                onPress={() => {
                  const updateCheckbox1 = !checkbox1;
                  setCheckbox1(updateCheckbox1);
                  console.log(checkbox1);
                }}
              />
              <Pressable onPress={() => bouncyCheckbox1Ref?.onPress()}>
                  <Text style={styles.confidentialityText}>
                  J'accepte
                  <Link url='https://policies.google.com/privacy?hl=fr-CA'>
                    {" "}
                    la politique de confidentialité{" "}
                  </Link>
                  et
                  <Link url='https://policies.google.com/privacy?hl=fr-CA'>
                    {" "}
                    les conditions d'utilisation{" "}
                  </Link>
                  .
                  </Text>
              </Pressable>
              
            </View>
            <View style={styles.confidentialityItem}>
              <BouncyCheckbox
                ref={(ref) => (bouncyCheckbox2Ref = ref)}
                size={25}
                fillColor={COLORS.accent600}
                disableText
                iconStyle={{ borderRadius: 0 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
                isChecked={checkbox2}
                onPress={() => {
                  const updateCheckbox2 = !checkbox2;
                  setCheckbox2(updateCheckbox2);
                }}
              />
              <Pressable onPress={() => bouncyCheckbox2Ref?.onPress()}>
                    <Text style={styles.confidentialityText}>
                    J'accepte le traitement de mes données personnelles de santé
                    dans le but de bénéficier des fontions de l'application{" "}
                    <Link url='https://jonathan-boyer.fr'>Ampela</Link>
                  </Text>
              </Pressable>
             
            </View>
          </View>
          <View style={styles.btnBox}>
            {
                !isAllChecked ? 
                <Button
                    bgColor={COLORS.neutral100}
                    textColor={COLORS.accent600}
                    onPress={handleAcceptAllBtnPress}
                 >
                  Tout accepter
                </Button>
                : null
            }
            <Button
              bgColor={COLORS.accent600}
              textColor={COLORS.neutral100}
              borderRadius={15}
              onPress={handleNextBtnPress}
            >
              Suivant
            </Button>
          </View>
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.neutral200,
  },
  logo: {
    width: 200,
    height: 200,
  },
  confidentialityContainer: {
    position: "absolute",
    backgroundColor: COLORS.neutral100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  confidentialityTitle: {
    textAlign: "center",
    marginTop: "35%",
    fontSize: RFValue(SIZES.xxLarge),
    fontFamily: FONT.bold,
  },
  confidentialityContent: {
    marginTop: "40%",
    marginHorizontal: 20,
  },
  confidentialityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 20,
  },
  confidentialityText: {
    fontFamily: "Regular",
    fontSize: RFValue(SIZES.medium),
    lineHeight: 24,
    paddingRight: 20,
  },
  btnBox: {
    position: "absolute",
    bottom: 30,
    left: 20,
  },
});

export default DiscoveryScreen;
