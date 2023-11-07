import { useCallback, useContext } from 'react';
import { Text, Linking, Alert, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { ThemeContext } from './theme-context';

const Link = ({url, children}) => {
    const {theme} = useContext(ThemeContext);
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
  
        if(supported) {
            await Linking.openURL(url)
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
  
    return <Text style={{color: theme === "pink" ? COLORS.accent600 : COLORS.accent800}} onPress={handlePress}>{children}</Text>;
}

export default Link;