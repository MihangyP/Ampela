import {useState, useContext} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderWithGoBack from '../../components/header-with-go-back';
import { ThemeContext } from '../../components/theme-context';
import { useTranslation } from 'react-i18next';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { SIZES, COLORS } from '../../../constants';

const ThemeScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [checkboxState, setCheckboxState] = useState(true);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const handleCheckboxChange =   () => {
        setCheckboxState();
        toggleTheme();
    };
    return (
        <View style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]}>
            <HeaderWithGoBack title={t('theme')} navigation={navigation} onIconLeftPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <View style={styles.flex}>
                    <Text style={styles.medium}>Anna's Rose</Text>
                    <View>
                  
                        <BouncyCheckbox 
                             size={25}
                             fillColor={theme === 'pink' ? COLORS.accent600 : COLORS.accent800}
                             disableText
                             innerIconStyle={{ borderWidth: 2 }}
                             isChecked={checkboxState}
                             onPress={handleCheckboxChange}
                        />
                    </View>
                </View>
                {/* <View style={styles.flex}>
                    <Text style={styles.medium}>Linda's Sunset</Text>
                    <View>
                        <BouncyCheckbox 
                             size={25}
                             fillColor={theme === 'pink' ? COLORS.accent600 : COLORS.accent800}
                             disableText
                             innerIconStyle={{ borderWidth: 2 }}
                             isChecked={checkboxState}
                             onPress={handleCheckboxChange}
                        />
                    </View>
                </View> */}
                {/* <View style={styles.flex}>
                <Text style={styles.medium}>Linda's Sunset</Text>
                    <View>
                        <BouncyCheckbox 
                            size={25}
                            fillColor={theme === 'pink' ? COLORS.accent600 : COLORS.accent800}
                            disableText
                            innerIconStyle={{ borderWidth: 2 }}
                            isChecked={checkboxState}
                            onPress={handleCheckboxChange}
                        />
                    </View>
                </View> */}
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
        marginTop: 100
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