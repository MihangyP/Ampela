import {useContext} from 'react';
import {View, ScrollView, Text, StyleSheet, ImageBackground} from 'react-native';
import {COLORS, SIZES, images} from '../../../constants';
import HeaderWithGoBack from '../../components/header-with-go-back';
import { ThemeContext } from '../../components/theme-context';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';

const ArticleContentScreen = ({route, navigation}) => {
    const {theme} = useContext(ThemeContext);
    const {title, content} = route.params;
    const {t} = useTranslation();
    return (
        <ScrollView style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]} >
          <ImageBackground source={images.imgArticle} resizeMode="cover" style={{height: 220}}>
              <HeaderWithGoBack title="" navigation={navigation} />
              <Text style={[styles.title, {color: theme === 'pink' ? COLORS.accent600 : COLORS.accent800}]}>{t(title)}</Text>
          </ImageBackground>
          <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <Text style={styles.content}>
                {t(content)}
            </Text>
          </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontFamily: "SBold",
        fontSize: RFValue(SIZES.xLarge),
        textAlign: "center",
        marginTop: 15
    },
    content: {
        fontFamily: "Regular",
        fontSize: SIZES.medium,
        lineHeight: 22,
    }
})

export default ArticleContentScreen;