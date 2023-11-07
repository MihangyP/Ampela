import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../components/theme-context";
import { SIZES, COLORS } from "../../../constants";
import HeaderWithGoBack from "../../components/header-with-go-back";
import Link from "../../components/link";

const contentData = [
  {
    subtitle: "calendrierDuCycleMenstruel",
    content: "calendrierDuCycleMenstruelContent"
  },
  {
    subtitle: "articles",
    content: "articleContent"
  },
  {
    subtitle: "forumEtMessagePriveAvecLePersonnelDeSante",
    content: "forumEtMessagePriveAvecLePersonnelDeSanteContent"
  },
  {
    subtitle: "parametresEtPartageDeLapplication",
    content: "parametresEtPartageDeLapplicationContent"
  }
]


const InfoScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]); 
  

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
        <View style={{marginTop: 20}}>
        <Text style={styles.text}>
          {t("introInfo")}
      </Text>
        </View>
      
      <View style={styles.contentContainer}>
        {
          contentData.map((content) => {
            return (<View key={content.subtitle}>
              <Text style={styles.subtitle}>{t(content.subtitle)}</Text>
              <Text style={styles.text}>{t(content.content)}</Text>
            </View>)
          })
        }
      </View>
      
      <View style={{marginTop: 30, marginBottom: 15}}> 
      <Text style={styles.text}>{t("partenariat")} : UNFPA Madagascar, Orange Madagascar </Text>
      <Text style={styles.text}>{t("siteWeb")}: <Link url="https://www.google.com">www.ampela.com</Link></Text>

      </View>

      </ScrollView>     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    marginTop: 15           
  },
  text: {
    fontFamily: "Regular",
    fontSize: SIZES.medium,
    lineHeight: 22
  },
  subtitle: {
    fontFamily: "SBold",
    fontSize: SIZES.large
  }
});

export default InfoScreen;
