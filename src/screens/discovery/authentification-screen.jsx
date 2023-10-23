import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, images } from '../../../constants';
import Button from '../../components/button';

const AuthentificationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.ignoreContainer}
                onPress={() => navigation.navigate('CalendarScreen')}
            ><Text style={styles.ignoreText}>Ignorer</Text></TouchableOpacity>
            <Image source={images.wavebg} style={styles.waveBg} />
            <Text style={styles.title}>Authentification</Text>
            <Text style={styles.subtitle}>Afin d'acceder au forum et aux messages privés avec les personnes de santé, vous devez créer un compte.</Text>
            <View style={styles.btnBox}>
                <Button
                    border={true}
                    borderRadius={15}
                    onPress={() => navigation.navigate('LogInScreen')}
                >
                    Se connecter
                </Button>
                <Button
                    border={true}
                    borderRadius={15}
                    onPress={() => navigation.navigate('SignUpScreen')}
                >
                    Créer un compte
                </Button>
                <Button
                    bgColor={COLORS.accent600}
                    textColor={COLORS.neutral100}
                    borderRadius={15}
                >
                    Se connecter avec key API
                </Button>
                <Button
                    bgColor={COLORS.accent600}
                    textColor={COLORS.neutral100}
                    borderRadius={15}
                >
                    Se connecter avec Google
                </Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral100
    },
    waveBg: {
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        right: 0
    },
    ignoreContainer: {
        zIndex: 20000,
        position: "absolute",
        top: 60,
        right: 20
    },
    ignoreText: {
        fontFamily: "Medium",
        color: COLORS.neutral400
    },
    title: {
        textAlign: "center",
        fontFamily: "Bold",
        fontSize: SIZES.xxLarge,
        marginBottom: 15,
        marginTop: "80%"
    },
    subtitle: {
        textAlign: "center",
        fontFamily: "Regular",
        marginHorizontal: 20
    },
    btnBox: {
        position: "absolute",
        bottom: 10,
        marginLeft: 20,
        gap: 8
    }
})

export default AuthentificationScreen;