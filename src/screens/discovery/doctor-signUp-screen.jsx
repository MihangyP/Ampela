import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, Alert } from 'react-native';
import { COLORS, SIZES, images } from "../../../constants";
import Button from '../../components/button';
import { Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const DoctorSignUpScreen = ({ navigation }) => {
    const [fullname, setFullname] = useState("");
    const [job, setJob] = useState("");
    const [tel, setTel] = useState("");
    const [adress, setAdress] = useState("");

    const handleLogInTextPress = () => {
        navigation.navigate("DoctorLogInScreen");
    }

    const handleNextBtnPress = async () => {
        if (fullname && job && tel && adress) {
            navigation.navigate("DoctorSignUpFollowingScreen", { fullname, job, tel, adress });
        } else Alert.alert("Veuillez remplir tous les champs :)")
    }

    return (
        <View style={styles.container}>
            <Image source={images.wavebg} style={styles.waveBg} />

            <View className="flex flex-col items-center flex-1 w-full mt-18 justify-center">
                <Text style={styles.title}>S'inscrire </Text>

                <View className="gap-3 mt-5">
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Nom et Prénom"
                        style={styles.input}
                        value={fullname}
                        onChangeText={setFullname}
                    />
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Profession"
                        style={styles.input}
                        value={job}
                        onChangeText={setJob}
                    />
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Tel"
                        style={styles.input}
                        value={tel}
                        onChangeText={setTel}
                    />
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Adresse"
                        style={styles.input}
                        value={adress}
                        onChangeText={setAdress}
                    />
                </View>

            </View>
            <View className="items-center mb-3">
                <Button
                    bgColor={COLORS.accent600}
                    textColor={COLORS.neutral100}
                    borderRadius={15}
                    onPress={handleNextBtnPress}
                >Suivant</Button>
                <View className="flex-row my-2">
                    <Text style={{ fontFamily: "Regular" }}>Vous avez un compte ? </Text>
                    <Pressable onPress={handleLogInTextPress}><Text style={{ fontFamily: "Regular", color: COLORS.accent600 }}> Connectez-vous</Text></Pressable>

                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral100
    },
    title: {
        fontFamily: "Bold",
        fontSize: SIZES.xxLarge,
        marginBottom: 15,
        textAlign: "center",
    },
    waveBg: {
        position: "absolute",
        width: "115%",
        top: 0,
        left: 0,
        right: 0,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 15,
        fontFamily: "Medium",
        width: Math.floor(Dimensions.get("window").width) - 40,
    },
})

export default DoctorSignUpScreen;