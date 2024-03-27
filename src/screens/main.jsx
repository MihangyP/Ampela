import React, { useState, useContext, useEffect } from "react";
import { BackHandler, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../components/theme-context";
import { COLORS, icons } from "../../constants";
import ArticlesScreen from "./articles/articles-screens";
import ForumScreen from "./forum/forum-screens";
import SettingsScreen from './settings/settings-screen';
import CalendarScreen from "./calendar/calendar-screen";
import { useFocusEffect } from "@react-navigation/native";
import { openDatabase } from 'expo-sqlite';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();


const Main = () => {

  const { theme } = useContext(ThemeContext);
  const shouldBlockBackNavigation = true;

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
      if (storedValue === null || storedValue == "true") {
        await setLocalStorageItem("isFirstTime", "false");
        setIsFirstTime("false");
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

  console.log("ISFIRSTIME DEPUIS MAIN", isFirstTime);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (shouldBlockBackNavigation) {
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        backHandler.remove();
      };
    }, [shouldBlockBackNavigation])
  );

  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          position: "absolute",
          marginHorizontal: 20,
          bottom: 30,
          paddingTop: 14,
          height: 50,
          borderRadius: 99,
          backgroundColor: theme === 'pink' ? COLORS.neutral100 : COLORS.primary,
          elevation: 0
        },
      }}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? (theme === 'pink' ? icons.calendarFocused : icons.calendarFocusedOrange) : (theme === 'pink' ? icons.calendar : icons.calendarWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          )
        }}
      />
      <Tab.Screen name="Articles" component={ArticlesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? (theme === 'pink' ? icons.articleFocused : icons.articleFocusedOrange) : (theme === 'pink' ? icons.article : icons.articleWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          )
        }}
      />
      <Tab.Screen name="Forum" component={ForumScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? (theme === 'pink' ? icons.forumFocused : icons.forumFocusedOrange) : (theme === 'pink' ? icons.forum : icons.forumWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          )
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? (theme === 'pink' ? icons.settingFocused : icons.settingFocusedOrange) : (theme === 'pink' ? icons.seting : icons.settingWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
