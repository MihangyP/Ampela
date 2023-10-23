import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SQLite } from 'expo-sqlite';
import ContainerNavigation from './src/components/navigation-container';
import './src/i18n';

const db = SQLite.openDatabase('myapp.db'); // Remplacez 'myapp.db' par le nom de votre base de données

const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);

  const checkIsFirstTime = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS app_usage (id INTEGER PRIMARY KEY AUTOINCREMENT, isFirstTime INTEGER)',
          [],
          () => {
            tx.executeSql(
              'SELECT isFirstTime FROM app_usage LIMIT 1',
              [],
              (_, result) => {
                if (result.rows.length > 0) {
                  const isFirstTimeValue = result.rows.item(0).isFirstTime;
                  setIsFirstTime(isFirstTimeValue === 1);
                } else {
                  setIsFirstTime(true);
                  tx.executeSql('INSERT INTO app_usage (isFirstTime) VALUES (1)');
                }
              },
              (error) => {
                console.error('Error checking isFirstTime:', error);
              }
            );
          },
          (error) => {
            console.error('Error creating app_usage table:', error);
          }
        );
      },
      null,
      null
    );
  }, []);

  const [fontsLoaded] = useFonts({
    Regular: require('./assets/Fonts/WorkSans-Regular.ttf'),
    Medium: require('./assets/Fonts/WorkSans-Medium.ttf'),
    SBold: require('./assets/Fonts/WorkSans-SemiBold.ttf'),
    Bold: require('./assets/Fonts/WorkSans-Bold.ttf'),
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
    checkIsFirstTime();
    hideSplashScreen();
  }, [hideSplashScreen, checkIsFirstTime]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <React.Fragment>
      <ContainerNavigation />
      <Text>Is it the first time? {isFirstTime ? 'Yes' : 'No'}</Text>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splashScreenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
