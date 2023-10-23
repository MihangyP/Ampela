import React from 'react';
import  {View, Text, StyleSheet} from 'react-native';
import Button from '../button';
import { SIZES, COLORS } from '../../../constants';

const AuthWithGoogle = () => {
    return (
        <View style={styles.container}>
            <View style={styles.ignoreContainer}>
                <Text style={{fontFamily: "Regular"}}>Ignorer</Text>
            </View>

            <View style={{gap: 20}}>
                <Text style={styles.title}>Authentification</Text>
                <Text style={styles.description}>Afin de sauvegarder vos données et accéder au forum et aux messages privés avec les personnels de santé, veuillez ajouter votre e-mail.</Text>
                <View>
                    <Button bgColor={COLORS.accent600} textColor={COLORS.primary} borderRadius={30}>Se connecter avec google</Button> 
                    <Button bgColor={COLORS.accent600} textColor={COLORS.primary} borderRadius={30}>Se connecter avec Facebook</Button>    
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.neutral200,
    },
    ignoreContainer: {
        position: "absolute",
        right: 0,
        top: 0
    },
    title: {
        fontSize: SIZES.xLarge,
        fontFamily: "Bold",
    }, 
    description: {
        fontFamily: "Regular",
        fontSize: SIZES.small
    }
})

export default AuthWithGoogle;