import {useContext} from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { SIZES, COLORS } from '../../constants';
import { useTranslation } from 'react-i18next';
import {images} from '../../constants';
import { ThemeContext } from './theme-context';
import { RFValue } from 'react-native-responsive-fontsize';

const ArticleItem = ({navigation ,title, category, content, onPress}) => {
    const {t} = useTranslation();
    let categoryText = null;
    switch (category) {
        case 'Menstruations': 
           categoryText = t('menstruations');
           break;
        case 'Hygiène menstruelle':
            categoryText = t('hygieneMenstruelle');
            break;
        case 'Troubles et maladies':
            categoryText = t('troublesEtMaladies');
            break;
        case 'Planning Familiale':
            categoryText = t('plannigFamiliale');
            break;
        case 'Astuces': 
            categoryText = t('astuces');
            break;
        default:
            return null;
    }
    const {theme} = useContext(ThemeContext);
    const handleTextPress = () => {
        navigation.navigate("ArticleContentScreen", {
            title: title,
            content: content
        });
    }
    const handleContainerPress = () => {
        onPress(title, content);
    }
    return (
        <Pressable style={styles.container} onPress={handleContainerPress}>
            <Text style={styles.title}>{t(title)}</Text>
            <View style={[styles.category, {backgroundColor: theme === 'pink' ? COLORS.accent400 : COLORS.neutral250}]}>
                <Text style={{fontFamily: 'Regular', color: theme === 'pink' ? COLORS.neutral100 : COLORS.primary}}>{categoryText}</Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Image source={images.imgArticle} style={{width: 303, height: 303}} />
            </View>
            <Text style={styles.content}
               numberOfLines={4}
            >
               {t(content)}
            </Text>
            <Pressable onPress={handleTextPress}>
                <Text style={{color: theme === 'pink' ? COLORS.accent600 : COLORS.accent800 , fontFamily: "Regular",marginTop: 6}} 
            >Voir plus {">"} </Text>
            </Pressable>
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        backgroundColor: COLORS.neutral100,
        padding: 15,
        borderRadius: 15
    },
    title: {
        fontSize: RFValue(SIZES.xLarge),
        fontFamily: 'SBold'
    },
    category: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginVertical: 10
    },
    content: {
        fontFamily: 'Regular',
        lineHeight: 20
    }
})

export default ArticleItem;