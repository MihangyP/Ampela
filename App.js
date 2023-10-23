import { StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import ContainerNavigation from "./src/components/navigation-container";
import "./src/i18n";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

const App = () => {

  useEffect(() => {
    hideSplashScreen();
  }, [hideSplashScreen]);

  const [fontsLoaded] = useFonts({
    Regular: require("./assets/Fonts/WorkSans-Regular.ttf"),
    Medium: require("./assets/Fonts/WorkSans-Medium.ttf"),
    SBold: require("./assets/Fonts/WorkSans-SemiBold.ttf"),
    Bold: require("./assets/Fonts/WorkSans-Bold.ttf"),
  });

  const hideSplashScreen = useCallback(async () => {
    if (!fontsLoaded) {

      return;
    }

    if (SplashScreen.preventAutoHideAsync) {
      await SplashScreen.preventAutoHideAsync();
    }

    await SplashScreen.hideAsync();
  }, [fontsLoaded]);



  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <React.Fragment>
      <ContainerNavigation />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  splashScreenText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default App;
