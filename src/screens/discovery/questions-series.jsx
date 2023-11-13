import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { ResponseOfQuestion0, ResponseOfQuestion1 } from '../../components/response-of-question';
import { COLORS, SIZES } from "../../../constants";
import { RFValue } from 'react-native-responsive-fontsize';
import * as SQLite from 'expo-sqlite';
import { createTable, deleteAllUsers, insertUser, selectUsers } from "../../../config/databaseLocalConfig";
import db from '../../../config/databaseInstance';
import NetInfo from '@react-native-community/netinfo';
import firebase from "firebase/app";
// import { connectDB, addDataSignup } from "../../../config/databaseLocalConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const QuestionsSeries = ({ navigation, route }) => {
  const { user } = route.params;
  const { nomDutilisateur, motDePasse, profession, selected } = user;
  const { t } = useTranslation();

  const [response0, setResponse0] = useState("");
  const [response1, setResponse1] = useState("");
  const dontRememberText = t('jeMenSouviensPas');

  const handleResponsePress0 = useCallback((item) => {
    setResponse0(item);
  }, []);
  const handleResponsePress1 = useCallback((item) => {
    setResponse1(item);
  }, []);

  const menstruationDurations = [];
  const cycleDurations = [];

  for (let i = 2; i < 46; i++) {
    let text = null;
    if (i > 2 && i < 8) {
      text = i + " " + t('jours');
      menstruationDurations.push(text);
    }
    if (i > 20 && i < 46) {
      text = i + " " + t('jours');
      cycleDurations.push(text);
    }
  }

  function getNumberFromString(strs) {
    if(strs === dontRememberText) {
      return 28;
    } else {
      const arrs = strs.split(' ');
      return parseInt(arrs[0], 10);
    }
  }

  
  const handleNextBtnPress = async () => {
    if (response0 && response1) {

      // const localDb = SQLite.openDatabase("ampela.db");
      
      
      createTable(db);
      insertUser(db, nomDutilisateur, motDePasse, profession, selected, getNumberFromString(response0), getNumberFromString(response1));
      selectUsers(db);


      // const netInfo = await NetInfo.fetch();

      // if (netInfo.isConnected) {
      //   // L'utilisateur a une connexion Internet, appelez la fonction pour ajouter des données
      //   try {
      //     const userCredential = await createUserWithEmailAndPassword(
      //       auth,
      //       mailOrTel,
      //       password
      //     );

      //     const user = userCredential.user;
      //     const { uid, email } = user;

      //     const db = getFirestore();
      //     const usersCollectionRef = doc(db, "users", uid);

      //     await setDoc(usersCollectionRef, {
      //       uid: uid,
      //       email: email,
      //       pseudo: nomDutilisateur,
      //       profession: profession,
      //       dernierDateMenstruation: lastMenstruationDate,
      //       dureeMenstruation: response0,
      //       dureeCycle: response1
      //     });

      //     // setIsAuthenticated(true);

      //     Alert.alert("Registration Successful!", "Your account has been created successfully.");

      //   } catch (error) {
      //     console.error("Error during registration:", error.message);
      //     Alert.alert("Registration Error", error.message);
      //   }

      //   // Maintenant que les données ont été ajoutées, vous pouvez naviguer vers la page suivante.
      //   navigation.navigate('CalendarScreen');
      // } else {
      //   // Aucune connexion Internet, affichez un message d'erreur ou prenez d'autres mesures nécessaires
      //   console.error('Aucune connexion Internet disponible.');
      // }

      const durationMenstruation = response0;
      const lastMenstruationDate = response1;
      navigation.navigate('SignUpScreen', { nomDutilisateur, motDePasse, cycleDurations, durationMenstruation, lastMenstruationDate, profession });
    } else {
      Alert.alert("Veuillez répondre à toutes les questions...");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentItem}>
          <Text style={styles.question}>{t('dureeDeVosRegles')}</Text>
          <FlatList
            data={menstruationDurations}
            renderItem={({ item }) => (<ResponseOfQuestion0 text={item} active={response0 === item ? true : false} onPress={() => handleResponsePress0(item)} />)}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View><View style={styles.contentItem}>
          <Text style={styles.question}>{t('dureeDeVotreCycle')}</Text>
          <FlatList
            data={cycleDurations}
            renderItem={({ item }) => (<ResponseOfQuestion1 text={item} active={response1 === item ? true : false} onPress={() => handleResponsePress1(item)} />)}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <View style={{ marginTop: 15 }}>
            <ResponseOfQuestion1 text={dontRememberText} active={response1 === dontRememberText ? true : false} onPress={() => handleResponsePress1(dontRememberText)} />
          </View>
        </View>
      </View>
      <View style={styles.btnBox}>
        <Button
          bgColor={COLORS.accent600}
          textColor={COLORS.neutral100}
          borderRadius={15}
          onPress={handleNextBtnPress}
        >
          {t('suivant')}
        </Button>
      </View>
      <View style={styles.btnBox}>
        <Button
          bgColor={COLORS.accent600}
          textColor={COLORS.neutral100}
          borderRadius={15}
          onPress={handleNextBtnPress}
        >
          {t('suivant')}
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
  content: {
    marginTop: "30%",
    paddingLeft: 20
  },
  contentItem: {
    marginTop: 15
  },
  question: {
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.xLarge),
    marginBottom: 8
  },

  btnBox: {
    position: "absolute",
    bottom: 30,
    marginLeft: 20
  }
})

export default QuestionsSeries;