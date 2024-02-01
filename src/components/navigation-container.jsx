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
import { openDatabase } from "expo-sqlite";

const db = openDatabase("your_database_name.db");

const Stack = createNativeStackNavigator();


const ContainerNavigation = ({ onLayout }) => {

  // const [isFirstTime, setIsFirstTime] = useState('');

  // const fetchData = async () => {
  //   try {
  //     // AsyncStorage.removeItem("statue")
  //     const storedValue = await AsyncStorage.getItem('statue');
  //     console.log("STORED VALUE 1 ", storedValue);
  //     if (storedValue == null || storedValue == '') {
  //       await AsyncStorage.setItem('statue', 'true');
  //       setIsFirstTime(true);
  //     } else {
  //       console.log("STORED VALUE 2", storedValue);
  //       setIsFirstTime(storedValue === 'true');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   console.log("ISFIRTSIME ", isFirstTime);
  //   console.log("ISFIRSTIME  EVALUATION: ", isFirstTime == false);
  // }, []);


  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS settings;'
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, statue BOOLEAN);"
      );

      tx.executeSql("SELECT * FROM settings", [], (_, result) => {
        if (result.rows.length === 0) {
          // Table vide, première exécution, initialisez avec 'true'
          tx.executeSql("INSERT INTO settings (statue) VALUES (?)", [true]);
          setIsFirstTime(true);
        } else {
          // La table n'est pas vide, utilisez la valeur existante
          const storedValue = result.rows.item(0).statue;
          setIsFirstTime(storedValue);
        }
      });
    });
  }, []);

  console.log("ISFIRSTIME: ", isFirstTime);
  console.log("ISFIRSTIME EVALUATION: ", isFirstTime==false);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={isFirstTime === false ? 'CalendarScreen' : 'Discovery'}
        >

          <Stack.Screen name="Discovery" component={DiscoveryScreen} />
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
