import {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../components/theme-context';
import { SIZES, COLORS } from '../../../constants';
import HeaderWithGoBack from '../../components/header-with-go-back';

const FaqScreen = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
    return (
        <View style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]}>
            <HeaderWithGoBack title="F.A.Q" navigation={navigation} />
            <Text>WAyyyyyyyy</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
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
})

export default FaqScreen;