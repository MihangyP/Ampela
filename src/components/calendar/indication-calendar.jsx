import {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../theme-context';
import {COLORS} from '../../../constants';

const IndicationCalendar = ({title}) => {
    const {theme} = useContext(ThemeContext);
    const {t} = useTranslation();
    let titleText = null;
    let bgColor = null;
    let borderWidth = null;
    let borderColor = null;
    switch (title) {
        case 'Jours des règles':
            titleText = t('joursDesRegles');
            bgColor = theme === 'pink' ? COLORS.accent400 : COLORS.neutral250;
            break;
        case 'Ovulation':
            titleText = t('ovulation');
            borderWidth = 1;
            borderColor = theme === 'pink' ? COLORS.accent600 : COLORS.accent800;
            break;
        case 'Période de fécondité':
            titleText = t('periodeDeFecondite');
            bgColor = theme === 'pink' ? COLORS.accent600 : COLORS.accent800;
            break;
        default:
            return null;
    }
    return (
        <View style={styles.container}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: bgColor,
                  borderWidth: borderWidth,
                  borderColor: borderColor
                },
              ]}
            />
            <Text style={styles.text}>{titleText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 100,
    },
    text: {
        fontFamily: "Regular",
    }
})

export default IndicationCalendar;