import { useState, useContext } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { COLORS, SIZES, icons } from '../../../constants';
import { ThemeContext } from '../theme-context';

const FaqItem = ({question, response}) => {
    const {theme} = useContext(ThemeContext);
    const [active, setActive] = useState(false);
    const handlePress = () => {
        setActive(a => !a);
    }
    return (
        <Pressable onPress={handlePress} style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200  : COLORS.neutral280}]}>
            <View style={{flexDirection: "row",  alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={styles.question}>{question}</Text>
                    <Pressable onPress={handlePress} style={{
                        transform: [
                            {rotateZ: "0deg"}
                        ]
                    }}>
                        <Image source={icons.arrowDown} style={{width: 20, height: 20}} />
                    </Pressable>
            </View>    
            {
                active ?
                <Text style={styles.response}>{response}</Text> :
                null
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 8,
    },
    question: {
        fontFamily: "SBold",
        fontSize: SIZES.medium,
    },
    response: {
        fontFamily: "Regular",
        fontSize: SIZES.small,
        marginTop: 10
    }
})

export default FaqItem;