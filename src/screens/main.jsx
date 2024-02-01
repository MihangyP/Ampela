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

const Tab = createBottomTabNavigator();
const db = openDatabase('mydb.db');

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const shouldBlockBackNavigation = true;

  const [isFirstTime, setIsFirstTime] = useState(null);
  const checkFirstTime = async () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, statue BOOLEAN);'
      );

      tx.executeSql(
        'SELECT * FROM settings',
        [],
        (_, result) => {

          // Sinon, mettez à jour la valeur existante
          // const storedValue = result.rows.item(0).statue;
          tx.executeSql(
            'UPDATE settings SET statue = ?',
            [false], // Mettez à jour la valeur à son inverse
            (_, updateResult) => {
              console.log('Updated value in settings table');
              tx.executeSql(
                'SELECT * FROM settings',
                [],
                (_, result) => { setIsFirstTime(result.rows.item(0).statue); })

            },
            (_, updateError) => {
              console.error('Error updating value in settings table:', updateError);
            }
          );

        },
        (_, error) => {
          console.error('Error fetching data from settings table:', error);
        }
      );
    });
  };


  useEffect(() => {
    checkFirstTime();
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
