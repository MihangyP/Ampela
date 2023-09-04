// // import { View, Text } from "react-native";
// // import { useFonts } from "expo-font";
// // import { useEffect } from "react";
// // import * as SplashScreen from "expo-splash-screen";
// // import { SplashScreen } from 'expo';
// import ContainerNavigation from "./src/components/navigation-container";
// // import "./src/i18n";

// // SplashScreen.preventAutoHideAsync();

// const App = () => {

// //     useEffect(() => {
// //         async function hideSplashScreen() {
// //           await SplashScreen.hideAsync();
// //         }
// //         hideSplashScreen();
// //       }, []);

// //   const [fontsLoaded] = useFonts({
// //     Regular: require("./assets/Fonts/WorkSans-Regular.ttf"),
// //     Medium: require("./assets/Fonts/WorkSans-Medium.ttf"),
// //     SBold: require("./assets/Fonts/WorkSans-SemiBold.ttf"),
// //     Bold: require("./assets/Fonts/WorkSans-Bold.ttf"),
// //   });

// //   const onLayoutRootView = useCallback(async () => {
// //     if (fontsLoaded) {
// //       await SplashScreen.hideAsync();
// //     }
// //   }, [!fontsLoaded]);

// //   if (!fontsLoaded) {
// //     return null;
// //   }

//   return <ContainerNavigation />

//   // return <View>
//   //     <Text>Hello</Text>
//   // </View>
// };

// export default App;

import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import ContainerNavigation from "./src/components/navigation-container";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


// SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/Fonts/WorkSans-Regular.ttf"),
    Medium: require("./assets/Fonts/WorkSans-Medium.ttf"),
    SBold: require("./assets/Fonts/WorkSans-SemiBold.ttf"),
    Bold: require("./assets/Fonts/WorkSans-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <ContainerNavigation onLayout={onLayoutRootView} />;
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
