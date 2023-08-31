import { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme-context';
import { COLORS, SIZES } from '../../constants';

const ArticleCategory = ({active, onPress, children}) => {
    const { t } = useTranslation();
    const {theme} = useContext(ThemeContext);
    const containerStyle = active ? [styles.container, { backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800, borderColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800 }] : styles.container
    const textStyle = active ? [styles.text, { color: COLORS.neutral100 }] : styles.text
    let text = null;
    switch (children) {
        case "Menstruations":
            text = t('menstruations');
            break;
        case "Hygiène menstruelle": 
            text = t('hygieneMenstruelle');
            break;
        case "Troubles et maladies":
            text = t('troublesEtMaladies');
            break;
        case "Planning Familiale": 
            text = t('planningFamiliale');
            break;
        case "Astuces":
            text = t('astuces');
            break;
        default:
            break;
    }
    return (
        <Pressable style={containerStyle} 
          onPress={onPress}
        >
            <Text style={textStyle}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 15,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, .6)",
        backgroundColor: "rgba(255, 255, 255, .6)",
        height: 30
    },
    text: {
        fontFamily: 'Medium',
        fontSize: SIZES.small,
        color: COLORS.neutral400

    }
})

export default ArticleCategory;