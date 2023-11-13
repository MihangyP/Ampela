import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import Button from "../../components/button";
import { COLORS, SIZES, images } from "../../../constants";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import CustomPopup from "../../components/CustomPopup";

const DoctorAuthScreen = ({ navigation }) => {

  const [verificationKey, setVerificationKey] = useState("ZBtmRNoj");
  const [isLoading, setIsLoading] = useState(false);
  const [popupEmail, setPopupEmail] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };
  const handleLogInTextPress = () => {
    navigation.navigate("DoctorLogInScreen");
  }
  // const [isPopupVisible, setIsPopupVisible] = useState(false);
  // async function createCollectionIfNotExists(collectionName) {
  //   const db = getFirestore();

  //   try {
  //     
  //     const collectionRef = collection(db, collectionName);
  //     const docRef = await addDoc(collectionRef, {}); 
  //     console.log(`La collection ${collectionName} a été créée avec succès avec le document ID: ${docRef.id}`);
  //   } catch (error) {
  //     console.error(`Erreur lors de la création de la collection ${collectionName}:`, error);
  //   }
  // }


  // const collectionName = 'doctorKeys'; // Remplacez par le nom de votre collection
  // createCollectionIfNotExists(collectionName);
  // async function insertVerificationKey() {
  //   const db = getFirestore();
  //   const keysCollection = collection(db, "doctorKeys");

  //   function generateVerificationKey() {
  //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     let verificationKey = '';

  //     for (let i = 0; i < 8; i++) {
  //       const randomIndex = Math.floor(Math.random() * characters.length);
  //       verificationKey += characters.charAt(randomIndex);
  //     }

  //     return verificationKey;
  //   }

  //   const verificationKey = generateVerificationKey();

  //   console.log("Clé de vérification : " + verificationKey);


  //   try {
  //     const docRef = await addDoc(keysCollection, {
  //       key: verificationKey,
  //     });

  //     console.log("Clé de vérification insérée avec succès avec l'ID : ", docRef.id);
  //   } catch (error) {
  //     console.error("Erreur lors de l'insertion de la clé de vérification : ", error);
  //   }
  // }

  // insertVerificationKey();
  const handleVerificationBtnPress = async () => {
    setIsLoading(true);
    const db = getFirestore();
    const keysCollection = collection(db, "doctorKeys");
    const q = query(keysCollection, where("key", "==", verificationKey));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        navigation.navigate("DoctorSignUpScreen");
      } else {
        // Alert.alert("Clé invalide", "La clé de vérification est incorrecte.");
        setPopupMessage("Clé invalide \nLa clé de vérification est incorrecte. ");
        setPopupEmail("");
        setIsPopupVisible(true);
        setIsLoading(false);
      }
    } catch (error) {
      // console.error("Erreur lors de la recherche de la clé de vérification :", error);
      setPopupMessage("Erreur lors de la recherche de la clé de vérification :");
      setPopupEmail("");
      setIsPopupVisible(true);
      setIsLoading(false);
      setIsLoading(false);
    }
  };

  console.log(verificationKey);
  return (
    <View style={styles.container}>
      <Image source={images.wavebg} style={styles.waveBg} />
      <View className="flex  flex-col justify-center items-center flex-1 w-full ">
        <Text style={styles.title}>Entrez le code </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.advice}>1- Pour pouvoir vous connecter, veuillez vérifier votre boîte mail afin de trouver le code que nous vous avons envoyé</Text>
          <Text style={[styles.advice, { marginTop: 10 }]}>2- Copiez le code et collez le dans le champ ci-dessus</Text>
        </View>

        <View style={styles.inputBoxDeeper}>
          <TextInput
            onChangeText={setVerificationKey}
            cursorColor={COLORS.accent400}
            className='min-h-[45px] rounded-full'
            placeholder="Insérez le code ici"
            style={styles.input}
            editable={!isLoading}
            value='ZBtmRNoj'
          />
        </View>
      </View>
      <Button
        disable={isLoading}
        bgColor={COLORS.accent600}
        textColor={COLORS.neutral100}
        borderRadius={15}
        onPress={handleVerificationBtnPress}
      >
        {isLoading ? "Vérification" : "Vérifier"}
      </Button>
      <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
        <Text style={{fontFamily: "Regular"}}>Vous avez déjà un compte ?</Text>
        <Text style={{fontFamily: "Regular", color: COLORS.accent600}} onPress={handleLogInTextPress}> Connectez-vous</Text>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
    padding: 20
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
  advice: {
    fontFamily: "Regular",
    fontSize: SIZES.small,
    lineHeight: 18
  },

  inputBoxDeeper: {
    marginTop: 60,
    gap: 15,

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

});

export default DoctorAuthScreen;
