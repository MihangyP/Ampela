import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import ContainerNavigation from "./src/components/navigation-container";
// import "./src/i18n";
import React from 'react';

const App = () => {

  // useEffect(() => {
  //   hideSplashScreen();
  // }, [hideSplashScreen]);

  // const [fontsLoaded] = useFonts({
  //   Regular: require("./assets/Fonts/WorkSans-Regular.ttf"),
  //   Medium: require("./assets/Fonts/WorkSans-Medium.ttf"),
  //   SBold: require("./assets/Fonts/WorkSans-SemiBold.ttf"),
  //   Bold: require("./assets/Fonts/WorkSans-Bold.ttf"),
  // });

  // const hideSplashScreen = useCallback(async () => {
  //   if (!fontsLoaded) {

  //     return;
  //   }

  //   if (SplashScreen.preventAutoHideAsync) {
  //     await SplashScreen.preventAutoHideAsync();
  //   }

  //   await SplashScreen.hideAsync();
  // }, [fontsLoaded]);


  // useEffect(() => {
  //   SplashScreen.preventAutoHideAsync();
  // }, []);

  // if (!fontsLoaded) {
  //   return null;
  // }

  <Text>Hello</Text>
  // <>
  // <ContainerNavigation />
  // </>
};



export default App;
