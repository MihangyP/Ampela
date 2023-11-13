import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, Alert } from 'react-native';
import { COLORS, SIZES, images } from "../../../constants";
import Button from '../../components/button';
import { Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

const DoctorLoginScreen = ({ navigation }) => {
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupEmail, setPopupEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);



  const handleSignUpTextPress = () => {
    navigation.navigate("DoctorAuthScreen");
  }


  const handleLogInPress = async () => {
    if (mail && password) {
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, mail, password);
        const user = userCredential.user;
         
        if (user) {
          const uid = user.uid;


          const db = getFirestore();
          const usersCollectionRef = collection(db, 'users');
          const userDoc = await getDoc(doc(usersCollectionRef, uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            if (userData && userData.role === 'docteur') {
              navigation.navigate('MainDoctorScreen');
            } else {
              Alert.alert('Accès non autorisé', 'Vous n\'êtes  docteur.');
            }
          } else {
            Alert.alert('Utilisateur introuvable', 'Veuillez vérifier vos informations d\'identification.');
          }
        } else {
          Alert.alert('Authentification échouée', 'Vérifiez vos informations d\'identification.');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'authentification : ' + error.message);
      }
      setIsLoading(false);
    } else {
      Alert.alert('Champs vides', 'Veuillez remplir tous les champs.');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={images.wavebg} style={styles.waveBg} />

      <View className="flex flex-col items-center flex-1 w-full mt-18 justify-center">
        <Text style={styles.title}>Se connecter</Text>

        <View className="gap-3 mt-5">
          <TextInput
            cursorColor={COLORS.accent400}
            className='min-h-[45px] rounded-full'
            placeholder="Adresse Mail"
            style={styles.input}
            value={mail}
            onChangeText={setMail}
          />
          <TextInput
            cursorColor={COLORS.accent400}
            className='min-h-[45px] rounded-full'
            placeholder="Mot de passe"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

        </View>

      </View>
      <View className="items-center mb-3">
        <Button
          bgColor={COLORS.accent600}
          textColor={COLORS.neutral100}
          borderRadius={15}
          onPress={handleLogInPress}
        >{isLoading ? "Connexion..." : "Se connecter"}</Button>
        <View className="flex-row my-2">
          <Text style={{ fontFamily: "Regular" }}>Vous n'êtes pas encore inscris ? </Text>
          <Text style={{ fontFamily: "Regular", color: COLORS.accent600 }} onPress={handleSignUpTextPress}> Inscrivez-vous</Text>

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

export default DoctorLoginScreen;