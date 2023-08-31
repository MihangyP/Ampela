import {useContext} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import HeaderWithGoBack from '../../components/header-with-go-back';
import { ThemeContext } from '../../components/theme-context';
import { COLORS } from '../../../constants';
import DoctorInformation from '../../components/doctor-information';
import { useTranslation } from 'react-i18next';
import {SIZES} from '../../../constants';

const DoctorInformationScreen = ({route, navigation}) => {
    const {theme} = useContext(ThemeContext);
    const { name, job, image, adress, mail, num } = route.params;
    const {t} = useTranslation();
    return (
        <View style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]}>
            <HeaderWithGoBack navigation={navigation} title={t('infoDoc')} />
            <View style={{alignItems: "center", marginTop: 30}}>
                <Image source={image} style={{width: 83, height: 83}} />
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={{marginTop: 80}}>
               <DoctorInformation as="job" title={job} />
               <DoctorInformation as="mail" title={mail} />
               <DoctorInformation as="num" title={num} />
               <DoctorInformation as="adress" title={adress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    name: {
        fontFamily: "Regular",
        fontSize: SIZES.medium,
        marginTop: 15
    }
})

export default DoctorInformationScreen;