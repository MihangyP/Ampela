import {useState, useContext} from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import HeaderWithGoBack from '../../components/header-with-go-back';
import { ThemeContext } from '../../components/theme-context';
import { useTranslation } from 'react-i18next';

import { SIZES, COLORS, images } from '../../../constants';

const ThemeScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {theme, toggleTheme} = useContext(ThemeContext);
   
    const handleThemeChange = (theme) => {
        toggleTheme(theme);
    };
    return (
        <View style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]}>
            <HeaderWithGoBack title={t('theme')} navigation={navigation} onIconLeftPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Pressable style={{alignItems: "center", gap: 10}} onPress={() => handleThemeChange('pink')}>
                        <Text style={{fontFamily: "Regular"}}>Anna's Rose</Text>
                        <View style={{padding: 10, backgroundColor: theme == 'pink' ? COLORS.accent400 : COLORS.neutral250, borderRadius: 10}}>
                           <Image source={images.pinkTheme} style={{width: 150, height: 320, borderRadius: 10}} resizeMode='contain'/>
                        </View>
                        <View style={{width: 10, height: 10, borderRadius: 50, borderWidth: 1, borderColor: theme === 'pink' ? COLORS.accent500 : COLORS.primary , backgroundColor: theme === 'pink' ? COLORS.accent500 : COLORS.neutral100}} />
                    </Pressable>
                    <Pressable style={{alignItems: "center", gap: 10}} onPress={() => handleThemeChange('orange')}>
                        <Text style={{fontFamily: "Regular"}}>Linda Sunset</Text>
                        <View style={{padding: 10, backgroundColor: theme === 'pink' ? COLORS.accent400 : COLORS.neutral250, borderRadius: 10}}>
                             <Image source={images.orangeTheme} style={{width: 150, height: 320, borderRadius: 10}} resizeMode='contain'/>
                        </View>
                        <View style={{width: 10, height: 10, borderRadius: 50, borderWidth: 1, borderColor: theme === 'orange' ? COLORS.accent800 : COLORS.primary, backgroundColor: theme === 'orange' ? COLORS.accent800 : COLORS.neutral200}} />
                    </Pressable>
                </View>
             </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    header: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    medium: {
        fontFamily: "Medium",
        fontSize: SIZES.medium
    },
    content: {
        marginTop: 30
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25
    }
})

export default ThemeScreen;













// import {useContext} from 'react';
// import { Text, View, Button } from 'react-native';
// import { ThemeContext } from '../components/theme-context';
// import HeaderWithGoBack from '../components/header-with-go-back';
// import { COLORS } from '../../constants';

// const ThemeScreen = ({navigation}) => {
//     const { theme, toggleTheme } = useContext(ThemeContext);
//     return (
//         <View style={{flex: 1, backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100, paddingHorizontal: 20}}>
//             <HeaderWithGoBack title="Theme" navigation={navigation} onIconLeftPress={() => navigation.goBack()} />
//             <Text>Current Theme: {theme}</Text>
//             <Button title="Toggle Theme" onPress={toggleTheme} />
//         </View>
//     );
// }

// export default ThemeScreen;