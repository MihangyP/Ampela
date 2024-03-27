import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./theme-context";
import DiscoveryScreen from "../screens/discovery/discovery-screen";
import PersonalHealthTestScreen from "../screens/discovery/personal-health-test-screen";
import LastMenstrualCycleStartAge from "../screens/discovery/last-menstrual-cycle-start-age";
import QuestionsSeries from "../screens/discovery/questions-series";
import AuthentificationScreen from "../screens/discovery/authentification-screen";
import Main from "../screens/main";
import SignUpScreen from "../screens/discovery/signup-screen";
import LogInScreen from "../screens/discovery/login-screen";
import MessageScreen from "../screens/messages/message-screen";
import NotificationScreen from "../screens/forum/notification-screen";
import SettingsScreen from "../screens/settings/settings-screen";
import ChangeLanguageScreen from "../screens/settings/change-language-screen";
import FaqScreen from "../screens/settings/faq-screen";
import InfoScreen from "../screens/settings/info-screen";
import MessageContentScreen from "../screens/messages/message-content-screen";
import DoctorInformationScreen from "../screens/messages/doctor-information-screen";
import DoctorForumScreen from "../screens/forum/doctor-forum-screen";
import ThemeScreen from "../screens/settings/theme-screen";
import DoctorAuthScreen from "../screens/discovery/doctor-auth-screen";
import ArticleContentScreen from "../screens/articles/article-content-screen";
import AccountScreen from "../screens/settings/account-screen";
import UsernameAndPasswordScreen from "../screens/discovery/username-and-password-screen";
import DoctorSignUpScreen from "../screens/discovery/doctor-signUp-screen";
import DoctorLogInScreen from "../screens/discovery/doctor-login-screen";
import DoctorSignUpFollowingScreen from "../screens/discovery/doctor-signUp-following-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MainDoctorScreen from "../screens/forum/doctor-forum-screen";
import DoctorMessageScreen from "../screens/messages/message-screen-doctor";
import CommentScreen from "../screens/forum/comment-screen";

import Screen from "../screens/testNotification";
import db from "../../config/databaseInstance";



const Stack = createNativeStackNavigator();


const ContainerNavigation = () => {
  // const [isFirstTime, setIsFirstTime] = useState(null);

  // const fetchData = async () => {
  //   console.log("Avant la transaction");

  //   return new Promise((resolve, reject) => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, statue BOOLEAN);"
  //       );

  //       console.log("Dans la transaction");

  //       tx.executeSql("SELECT * FROM settings", [], (_, result) => {
  //         console.log("Après la requête SELECT");
  //         console.log("Nombre de lignes dans le résultat :", result.rows.length);

  //         if (result.rows.length <= 0) {
  //           console.log("Dans le bloc if");
  //           tx.executeSql("INSERT INTO settings (statue) VALUES (?)", [true], (_, insertResult) => {
  //             setIsFirstTime(true);
  //             console.log("IS FIRSTIME ", true);
  //             resolve();
  //           }, (_, insertError) => {
  //             console.error("Erreur lors de l'insertion :", insertError);
  //             reject(insertError);
  //           });
  //         } else {
  //           console.log("Dans le bloc else");
  //           const storedValue = result.rows.item(0).statue;
  //           console.log("Valeur stockée dans la base de données :", storedValue);

  //           setIsFirstTime(storedValue);
  //           console.log("IS FIRSTIME ", storedValue);
  //           resolve();
  //         }
  //       });
  //     });
  //   });
  // };

  // fetchData()
  //   .then(() => {
  //     console.log("Tout s'est bien passé, ici CA MARCHE");
  //   })
  //   .catch((error) => {
  //     console.error("Une erreur s'est produite :", error);
  //   });


  const [isFirstTime, setIsFirstTime] = useState(null);

  const getLocalStorageItem = async (key) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      return storedValue ? storedValue : null;
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
      return null;
    }
  };

  const setLocalStorageItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting data in AsyncStorage:", error);
    }
  };

  const fetchData = async () => {
    try {
      const storedValue = await getLocalStorageItem("isFirstTime");
      console.log("IS FIRSTIME 2", storedValue);
      if (storedValue === null || storedValue !== "true") {
        await setLocalStorageItem("isFirstTime", "true");
        setIsFirstTime("true");
        console.log("IS FIRSTIME 1", isFirstTime);
      } else {
        setIsFirstTime(storedValue);
        console.log("IS FIRSTIME ", storedValue);
      }
    } catch (error) {
      console.error("Error fetching or setting data in AsyncStorage:", error);
    }
  };

  useEffect(() => {
    fetchData();


  }, []);


  console.log(isFirstTime !== null && isFirstTime === 'true');
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={true ? 'CalendarScreen' : 'Discovery'}
        >

          <Stack.Screen name="Discovery" component={DiscoveryScreen} />
          <Stack.Screen name="Screen" component={Screen} />
          <Stack.Screen name="PersonalHealthTestScreen" component={PersonalHealthTestScreen} />
          <Stack.Screen name="LastMenstrualCycleStartAge" component={LastMenstrualCycleStartAge} />
          <Stack.Screen name="QuestionsSeries" component={QuestionsSeries} />
          <Stack.Screen
            name="AuthentificationScreen"
            component={AuthentificationScreen}
          />

          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="CalendarScreen" component={Main} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen name="DoctorMessageScreen" component={DoctorMessageScreen} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen
            name="ChangeLanguageScreen"
            component={ChangeLanguageScreen}
          />
          <Stack.Screen name="FaqScreen" component={FaqScreen} />
          <Stack.Screen name="InfoScreen" component={InfoScreen} />
          <Stack.Screen
            name="MessageContentScreen"
            component={MessageContentScreen}
          />
          <Stack.Screen
            name="DoctorInformationScreen"
            component={DoctorInformationScreen}
          />
          <Stack.Screen name="DoctorAuthScreen" component={DoctorAuthScreen} />
          <Stack.Screen
            name="MainDoctorScreen"
            component={MainDoctorScreen}
          />
          <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
          <Stack.Screen
            name="ArticleContentScreen"
            component={ArticleContentScreen}
          />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen
            name="UsernameAndPasswordScreen"
            component={UsernameAndPasswordScreen}
          />
          <Stack.Screen
            name="DoctorSignUpScreen"
            component={DoctorSignUpScreen}
          />
          <Stack.Screen
            name="DoctorSignUpFollowingScreen"
            component={DoctorSignUpFollowingScreen}
          />
          <Stack.Screen
            name="DoctorLogInScreen"
            component={DoctorLogInScreen}
          />
          <Stack.Screen
            name="CommentScreen"
            component={CommentScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default ContainerNavigation;
