import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, Alert } from 'react-native';
import { COLORS, SIZES, images } from "../../../constants";
import Button from '../../components/button';
import { Pressable } from 'react-native';
import { auth } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail, chec } from 'firebase/auth';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import CustomPopup from '../../components/CustomPopup';
import { getLastInsertedUserId, updateEmailForUser } from '../../../config/databaseLocalConfig';
import * as SQLite from 'expo-sqlite';

const DoctorSignUpFollowingScreen = ({ route, navigation }) => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [popupEmail, setPopupEmail] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const { fullname, job, tel, adress } = route.params;

    const handleLogInTextPress = () => {
        navigation.navigate("DoctorLogInScreen")
    }

    const handleNextBtnPress = async () => {

        if (mail && password && passwordConfirm) {
            try {
                if (password === passwordConfirm) {
                    setIsLoading(true);

                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        mail,
                        password,
                    );

                    const user = userCredential.user;
                    const { uid, email, emailVerified } = user;

                    if (emailVerified) {

                    } else {
                        await sendEmailVerification(user);
                        const db = getFirestore();
                        const usersCollectionRef = doc(db, 'users', uid);

                        await setDoc(usersCollectionRef, {
                            uid: uid,
                            pseudo: fullname,
                            profession: job,
                            tel: tel,
                            adress: adress,
                            role: "docteur",
                            uid: user.uid,
                        });

                        const localDb = SQLite.openDatabase("ampela.db");
                        const lastInsertedUserId = await getLastInsertedUserId(localDb);
                        const newEmail = email;

                        updateEmailForUser(localDb, lastInsertedUserId, newEmail);
                        // navigation.navigate('CalendarScreen');
                        setPopupMessage("Votre compte n'est pas encore confirmé. Veuillez vérifier votre e-mail. ");
                        setPopupEmail(mail);
                        setIsPopupVisible(true);
                    }

                } else { Alert.alert("Les mots de passe ne se correspondent pas") }

            } catch (error) {
                console.log(error);
                setPopupEmail("");
                if (error.code === 'auth/email-already-in-use') {
                    setPopupMessage('L\'adresse e-mail est déjà associée à un compte.');
                } else if (error.code === 'auth/invalid-email') {
                    setPopupMessage('L\'adresse e-mail est invalide.');
                } else if (error.code === 'auth/weak-password') {
                    setPopupMessage('Le mot de passe est trop faible. Veuillez choisir un mot de passe plus fort.');
                } else if (error.code === 'auth/network-request-failed') {
                    setPopupMessage('Une erreur de réseau s\'est produite. Veuillez vérifier votre connexion Internet.');
                } else if (error.code === 'auth/user-disabled') {
                    setPopupMessage('Votre compte a été désactivé. Contactez l\'assistance pour obtenir de l\'aide.');
                } else {
                    setPopupMessage('Une erreur s\'est produite lors de la création de l\'utilisateur : ' + error.message);
                }

                setIsPopupVisible(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsPopupVisible(true);
            setPopupMessage('Veuillez remplir tous les champs, y compris votre adresse e-mail.');
        }
        // navigation.navigate("DoctorForumScreen")
        // if (fullname && job && tel && adress) {
        //     try {
        //         const userCredential = await createUserWithEmailAndPassword( motDePasse);
        //         const user = userCredential.user;
        //         const db = getFirestore();
        //         const usersCollectionRef = collection(db, "users");

        //         const doctorData = {
        //             pseudo: fullname,
        //             profession: job,
        //             tel: tel,
        //             adress: adress,
        //             role: "docteur",
        //             uid: user.uid,
        //         };

        //         await setDoc(doc(usersCollectionRef, user.uid), doctorData);


        //         navigation.navigate("DoctorSignUpFollowingScreen");
        //     } catch (error) {

        //         console.error(error);
        //         Alert.alert("Erreur lors de la création du compte", error.message);
        //     }
        // } else {
        //     Alert.alert("Veuillez remplir tous les champs :)");
        // }
    }

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };


    return (
        <View style={styles.container}>
            <Image source={images.wavebg} style={styles.waveBg} />

            <View className="flex flex-col items-center flex-1 w-full mt-18 justify-center">
                <Text style={styles.title}>S'inscrire </Text>

                <View className="gap-3 mt-5">
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Mail"
                        style={styles.input}
                        value={mail}
                        onChangeText={setMail}
                    />
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Créez un mot de passe"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        cursorColor={COLORS.accent400}
                        className='min-h-[45px] rounded-full'
                        placeholder="Confirmez votre mot de passe"
                        style={styles.input}
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        secureTextEntry
                    />

                </View>

            </View>
            <View className="items-center mb-3">
                <Button
                    bgColor={COLORS.accent600}
                    textColor={COLORS.neutral100}
                    borderRadius={15}
                    onPress={handleNextBtnPress}
                >S'inscrire</Button>
                <View className="flex-row my-2">
                    <Text style={{ fontFamily: "Regular" }}>Vous avez un compte ? </Text>
                    <Pressable onPress={handleLogInTextPress}><Text style={{ fontFamily: "Regular", color: COLORS.accent600 }}> Connectez-vous</Text></Pressable>

                </View>
            </View>
            <CustomPopup
                message={popupMessage}
                email={popupEmail}
                visible={isPopupVisible}
                onClose={handlePopupClose}
            />
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

export default DoctorSignUpFollowingScreen;