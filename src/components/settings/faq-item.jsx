import { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { COLORS, SIZES, icons } from '../../../constants';
import { ThemeContext } from '../theme-context';
import { useTranslation } from 'react-i18next';

// [
//     {
//         title: "intro",
//         content: "Titlleee"
//     },
//     {
//         title: "list",
//         content: ["Hey", "Hello", "Way man negga"]
//     }
// ]

const FaqItem = ({question, response, list}) => {
    const {theme} = useContext(ThemeContext);
    const {t} = useTranslation();
    const [active, setActive] = useState(false);
   
    const handlePress = () => {
        setActive(a => !a);
    }
    
    return (
        <Pressable onPress={handlePress} style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200  : COLORS.neutral280}]}>
            <View style={{flexDirection: "row",  alignItems: "flex-start", justifyContent: "space-between"}}>
                <View style={{width: "90%"}}>
                <Text style={styles.question}>{t(question)}</Text>
                </View>
                    <Pressable onPress={handlePress} style={{
                        transform: [
                            {rotateZ: active ? "180deg" : "0deg"}
                        ]
                    }}>
                        <Image source={icons.arrowDown} style={{width: 20, height: 20}} />
                    </Pressable>
            </View>    
           {
                active ?
                (   
                <View>
                    <Text style={styles.response}>{t(response)}</Text>  
                    {list ? list.map((d) => <Text key={d} style={styles.response}>- {t(d)}</Text>) : null}
                </View>                  
                )
                   
                 :
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
        fontSize: SIZES.xmedium,
    },
    response: {
        fontFamily: "Regular",
        fontSize: SIZES.medium,
        marginTop: 10
    }
})

export default FaqItem;