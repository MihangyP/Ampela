import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  
  const getPushToken = async () => {
    const { permissions } = await Notifications.getPermissionsAsync();
    if (permissions.granted) {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: '3f77356e-dc44-4d5e-bfcd-dbe3c7b3c432', // Replace with your actual project ID
      });
      console.log('Push token:', token);
      // Use the token for handling notifications
    } else {
      await Notifications.requestPermissionsAsync();
    }
  };
  
  getPushToken();  
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  const handleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notification!',
        body: 'Ceci est une notification de test.',
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Expo Push Token: {expoPushToken}</Text>
      <Button title="Afficher une notification" onPress={handleNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    token = await Notifications.getExpoPushTokenAsync();
  } else {
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  console.log(token);
  return token;
}
