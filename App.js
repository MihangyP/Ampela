import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import ContainerNavigation from "./src/components/navigation-container";
import "./src/i18n";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


const App = () => {

  const [fontsLoaded] = useFonts({
    Regular: require("./assets/Fonts/WorkSans-Regular.ttf"),
    Medium: require("./assets/Fonts/WorkSans-Medium.ttf"),
    SBold: require("./assets/Fonts/WorkSans-SemiBold.ttf"),
    Bold: require("./assets/Fonts/WorkSans-Bold.ttf"),
  });


  // useEffect(() => {
  //   AsyncStorage.removeItem("statue")
  // }, []);

  if (!fontsLoaded) {
    return null;
  }




  return <ContainerNavigation />

};


export default App ;
