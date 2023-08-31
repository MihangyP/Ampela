import { useCallback } from 'react';
import { Text, Linking, Alert, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const Link = ({url, children}) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
  
        if(supported) {
            await Linking.openURL(url)
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
  
    return <Text style={styles.textAccent600} onPress={handlePress}>{children}</Text>;
}

const styles = StyleSheet.create({
    textAccent600: {
        color: COLORS.accent600
    }
}); 

export default Link;