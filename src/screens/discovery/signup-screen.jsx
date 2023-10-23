import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Linking, Modal, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/button';
import { COLORS, SIZES, images } from '../../../constants';
import CustomPopup from '../../components/CustomPopup';

const SignupScreen = ({ route }) => {
  const navigation = useNavigation();
  const [nameText, setNameText] = useState('');
  const [password, setPassword] = useState('');
  const [mailOrTel, setMailOrTel] = useState('');
  const { nomDutilisateur, motDePasse, cycleDurations, durationMenstruation, lastMenstruationDate, profession } = route.params;
  
  const [text, setText] = useState('(At least 8 characters, one uppercase letter, and one digit)');
  const [colorText, setColorText] = useState('#000000');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupEmail, setPopupEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);


  useEffect(() => {
    setInputsDisabled(isLoading);
  }, [isLoading]);


  const handleMailOrTextChange = (text) => {
    setMailOrTel(text);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

 useEffect
  const handleSignUpBtnPress = async () => {
    if (mailOrTel) {
      try {
        setIsLoading(true); 

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          mailOrTel,
          motDePasse,
        );

        const signInMethods = await fetchSignInMethodsForEmail(auth, mailOrTel);

        const user = userCredential.user;
        const { uid, email } = user;

        if (signInMethods.length > 0) {

          if (user.emailVerified) {
            const db = getFirestore();
            const usersCollectionRef = doc(db, 'users', uid);

            await setDoc(usersCollectionRef, {
              uid: uid,
              email: email,
              pseudo: nomDutilisateur,
              cycleDuration: cycleDurations,
              durationMenstruation: durationMenstruation,
              lastMenstruationDate: lastMenstruationDate,
              profession: profession,
            });
            navigation.navigate('CalendarScreen');
          } else {
            await sendEmailVerification(user);
            setPopupMessage('Un e-mail de vérification a été envoyé à votre adresse. Vérifiez votre e-mail pour accéder à votre compte.');
            setPopupEmail(mailOrTel);
            setIsPopupVisible(true);
          }
        } else {
          setPopupMessage('L\'utilisateur avec cet email existe déjà');
          setPopupEmail(error.message);
          setIsPopupVisible(true);
        }
      } catch (error) {
        setPopupMessage('L\'utilisateur avec cet email existe déjà');
        setPopupEmail(error.message);
        setIsPopupVisible(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsPopupVisible(true);
      setPopupMessage('Veuillez remplir tous les champs, y compris votre adresse e-mail.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.ignoreContainer}
        onPress={() => navigation.navigate('CalendarScreen')}
      >
        <Text style={styles.ignoreText}>Ignorer</Text>
      </TouchableOpacity>
      <Image source={images.wavebg} style={styles.waveBg} />
      <Text style={styles.title}>S'inscrire</Text>

      <View style={styles.inputBox}>
        <View style={styles.inputBoxDeeper}>
         
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                En ajoutant votre adresse e-mail, vous pourrez :
              </Text>
              <Text style={styles.infoText}>
                - Participer au forum et discuter avec d'autres utilisateurs.
              </Text>
              <Text style={styles.infoText}>
                - Accéder au chat privé pour des discussions en temps réel.
              </Text>
            </View>
         
          <View>
            <TextInput
              cursorColor={COLORS.accent400}
              value={mailOrTel}
              onChangeText={handleMailOrTextChange}
              placeholder="Votre adresse email"
              style={styles.input}
              editable={!inputsDisabled}
            />
          </View>
          <View>
            <Button
              bgColor={COLORS.accent600}
              textColor={COLORS.neutral100}
              borderRadius={15}
              onPress={handleSignUpBtnPress}
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "S'inscrire"}
            </Button>
            <Text style={styles.textBottom}>
             
               
                Vous avez déjà un compte ?
              
              <Text
                 onPress={() => navigation.navigate('LogInScreen')}
                style={styles.textLogIn}
               >
               {" "} Connectez-vous
              </Text>   
              
              
              
              
            </Text>
          </View>
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
};

const styles = StyleSheet.create({
  infoTextLink: {
    color: COLORS.accent600,
    textDecorationLine: 'underline',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    fontFamily: 'Medium',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  ignoreContainer: {
    zIndex: 20000,
    position: 'absolute',
    top: 60,
    right: 20,
  },
  ignoreText: {
    fontFamily: 'Medium',
    color: COLORS.neutral400,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: SIZES.xxLarge,
    marginBottom: 15,
    marginTop: '70%',
    textAlign: 'center',
  },
  waveBg: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
  },
  inputBox: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
  },
  inputBoxDeeper: {
    bottom: 5,
    marginLeft: 20,
    gap: 15,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
    fontFamily: 'Medium',
    width: Math.floor(Dimensions.get('window').width) - 40,
  },
  textBottom: {
    marginVertical: 6,
    fontFamily: "Regular",
    textAlign: 'center',
  },
  textLogIn: {
    color: COLORS.accent600,
  },
});

export default SignupScreen;
