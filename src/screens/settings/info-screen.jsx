import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../components/theme-context";
import { SIZES, COLORS } from "../../../constants";
import HeaderWithGoBack from "../../components/header-with-go-back";
import { ScrollView } from "react-native-gesture-handler";

const InfoScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
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
      <HeaderWithGoBack title={t("infoAmpela")} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.item}>
            <Text style={styles.subtitle}>Qu'est-ce que Ampela ?</Text>
            <Text style={styles.text}>
                Ampela est une application complète dédiée aux jeunes filles et femmes, conçue pour les aider à mieux comprendre, suivre et gérer leur cycle menstruel. L'application propose plusieurs fonctionnalités pour répondre aux besoins spécifiques des utilisatrices :
            </Text>
            <View style={{marginLeft: 10, marginTop: 15}}>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                        Calendrier de cycle menstruel : Ampela permet aux femmes de suivre leur cycle menstruel en enregistrant les dates de début et de fin de leurs règles, ainsi que d'autres informations importantes. L'application utilise ces données pour générer des prévisions et des rappels personnalisés sur le début des règles, l'ovulation et la prise de pilule contraceptive. Cela permet aux utilisatrices de mieux anticiper leurs cycles futurs, qu'elles cherchent à concevoir, à éviter une grossesse ou simplement à mieux comprendre leur corps.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Forum communautaire : Ampela propose un forum intégré où les utilisatrices peuvent poser des questions, partager leurs expériences et obtenir des conseils auprès d'autres femmes qui ont des préoccupations similaires. Cela crée un espace d'entraide et de soutien entre les membres de la communauté.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Messages privés avec un personnel de santé qualifié : Un aspect particulièrement intéressant d'Ampela est son système de messages privés, qui permet aux utilisatrices de communiquer directement avec un personnel de santé qualifié. Cela leur permet de recevoir des réponses personnalisées et des conseils professionnels sur des questions liées à leur cycle menstruel, leur santé reproductive ou toute autre préoccupation.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Informations complètes : Ampela fournit des informations complètes sur les menstruations, l'hygiène menstruelle, les problèmes associés et les infections sexuellement transmissibles (IST). Il offre également des conseils sur la planification familiale et explique les effets normaux des menstruations ainsi que les éventuels troubles associés. Cela permet aux utilisatrices de mieux comprendre leur corps et leur santé reproductive.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Accessibilité linguistique : L'application est disponible en français et en malgache, ce qui garantit une meilleure accessibilité pour toutes les utilisatrices, quels que soient leur langue et leur origine.
                    </Text> 
                </View>
               
            </View>
            <Text style={styles.subtitle}>Les avantages de Ampela</Text>
            <View style={{marginLeft: 10, marginTop: 15}}>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Permet de suivre précisément son cycle menstruel pour mieux planifier en conséquence.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Offre un forum communautaire pour poser des questions, partager des expériences et obtenir des conseils de femmes partageant les mêmes préoccupations.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Propose un système de messages privés avec un personnel de santé qualifié pour des réponses personnalisées et des conseils professionnels.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Fournit des informations complètes sur les menstruations, l'hygiène menstruelle, les problèmes associés et les IST.
                    </Text> 
                </View>
                <View style={{flexDirection: "row", gap: 8, marginBottom: 15}}>
                    <View style={{width: 7, height: 7, backgroundColor: COLORS.accent600, borderRadius: 100}} />
                    <Text style={[styles.text, {marginTop: -8}]}>
                    Disponible en français et en malgache, assurant une meilleure accessibilité pour toutes les utilisatrices.
                    </Text> 
                </View>
               
            </View>
            <Text style={styles.subtitle}>Les partenaires de Ampela</Text>
            <Text style={styles.text}>
            Ampela est développée en partenariat avec l'UNFPA (Fonds des Nations unies pour la population) et INNOVATION ROOM. L'UNFPA est une agence des Nations Unies qui œuvre pour la santé reproductive et les droits en matière de population. En collaborant avec l'UNFPA, Ampela bénéficie d'une expertise en santé reproductive et en planification familiale, renforçant ainsi la qualité des informations et des conseils fournis par l'application.
            </Text>
        </View>
     
      <Text style={styles.textInfo}>
      </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  textInfo: {
    fontFamily: "Regular",
    fontSize: SIZES.medium,
    lineHeight: 23
  },
  subtitle: {
    fontFamily: "SBold",
    fontSize: SIZES.large,
    color: COLORS.accent600,
    marginBottom: 8
  },
  item: {
    marginVertical: 20
  },
  text: {
    fontFamily: "Regular",
    fontSize: SIZES.medium,
    lineHeight: 22
  }

});

export default InfoScreen;
