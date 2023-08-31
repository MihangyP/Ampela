import {useContext} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES, images, icons } from '../../constants';
import SettingItem from './setting-item';
import { ThemeContext } from './theme-context';
import { useTranslation } from 'react-i18next';

const CustomDrawerContent = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
    const {t} = useTranslation();
    return (
        <View style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]}>
            <Text style={{fontSize: SIZES.small, fontFamily: "Medium"}}>Profil </Text>
            <View style={styles.img}>
                <Image source={images.doctor02} style={{width: 82, height: 82}} />
                <Text style={{fontFamily: "Medium", fontSize: SIZES.medium}}>Bernard</Text>
                <Text style={{fontFamily: "Medium", color: COLORS.neutral400, fontSize: SIZES.small}}>Gynécologue</Text>
            </View>
            <View style={{ marginTop: 100, gap: 25 }}>
                <SettingItem title={t('langues')} urlIcon={icons.language} navigation={navigation} chevronRight={true} routeToNavigate="ChangeLanguageScreen" />
                <SettingItem title={t('theme')} urlIcon={icons.themeIcon} navigation={navigation} chevronRight={true} routeToNavigate="ThemeScreen" />
                <SettingItem title={t('faq')} urlIcon={icons.question} navigation={navigation} chevronRight={true} routeToNavigate="FaqScreen" />
                <SettingItem title={t('infoDoc')} urlIcon={icons.info} navigation={navigation} chevronRight={true} routeToNavigate="InfoScreen" />
                <SettingItem title={t('partager')} urlIcon={icons.sharing} chevronRight={false} />
                <SettingItem title={t('deconnexion')} urlIcon={icons.logOut} chevronRight={false} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    img: {
        alignItems: "center",
        marginTop: 30,
    }
})

export default CustomDrawerContent;