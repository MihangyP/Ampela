import { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import SearchArticles from "../../components/search-articles";
import { SIZES } from "../../../constants";
import ArticleCategory from "../../components/article-category";
import ArticleContent from "../../components/article-content";
import BackgroundContainer from "../../components/background-container";
import { RFValue } from "react-native-responsive-fontsize";

const DATA = ["Menstruations", "Hygiène menstruelle", "Troubles et maladies", "Planning Familiale", "Astuces"]

const ArticlesScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Menstruations")  
  const handleArticleCategoryPress = useCallback((item) => {
      setActiveCategory(item);      
  }, [activeCategory]); 

  const handleTextInputChange = useCallback((inputText) => {
    setText(inputText);
  }, []); 

  return (
    <View style={styles.container}>
      <BackgroundContainer paddingBottom={50}>
      <Text style={styles.title}>{t('articles')}</Text>
      <SearchArticles text={text} onChange={handleTextInputChange} /> 
      <View>
        <FlatList
           data={DATA}
           renderItem={({item}) => <ArticleCategory onPress={() => handleArticleCategoryPress(item)} active={activeCategory === item ? true : false} >{item}</ArticleCategory>}
           horizontal
           showsHorizontalScrollIndicator={false}
        />
      </View>
      <ArticleContent 
        navigation={navigation}
        activeCategory={activeCategory}
        text={text}
      />
      </BackgroundContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.xLarge),
    textAlign: "center",
    marginTop: 60,
  },
});

export default ArticlesScreen;
