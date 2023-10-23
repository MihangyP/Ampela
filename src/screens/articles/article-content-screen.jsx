import {useContext} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import HeaderWithGoBack from '../../components/header-with-go-back';
import { ThemeContext } from '../../components/theme-context';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';


const ArticleContentScreen = ({route, navigation}) => {
    const {theme} = useContext(ThemeContext);
    const {title, content,img} = route.params;
    const {t} = useTranslation();
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            <View style={styles.cover}>
                <HeaderWithGoBack title="" navigation={navigation} />
                <View style={styles.flex}>
                    <View style={{width: "55%"}}>
                        <Text style={styles.title}>{t(title)}</Text>
                    </View>
                    <View style={{width: "45%"}}>
                    <Image source={img} style={{width: 150, height: 150}} resizeMode='contain' />
                    </View>
                </View>
            </View>
              
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
        flex: 1,
        backgroundColor: COLORS.neutral100
    },
    cover: {
        height: 260,
        backgroundColor: COLORS.neutral280
    },
    flex: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },  
    title: {
        fontFamily: "SBold",
        fontSize: RFValue(SIZES.xLarge),
        textAlign: "center",
        marginTop: 15,
        color: COLORS.primary
    },
    content: {
        fontFamily: "Regular",
        fontSize: SIZES.medium,
        lineHeight: 22,
    }
})

export default ArticleContentScreen;