import {useContext} from "react";
import { Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../components/theme-context";
import { COLORS, icons } from "../../constants";
import ArticlesScreen from "./articles/articles-screens";
import ForumScreen from "./forum/forum-screens"; 
import SettingsScreen from './settings/settings-screen';
import CalendarScreen from "./calendar/calendar-screen";

const Tab = createBottomTabNavigator();
 
const Main = () => {
  const { theme } = useContext(ThemeContext);
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
              <Image source={ focused ? ( theme === 'pink' ? icons.calendarFocused : icons.calendarFocusedOrange ) : (theme === 'pink' ? icons.calendar : icons.calendarWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          ) 
         }}
      />
      <Tab.Screen name="Articles" component={ArticlesScreen}
         options={{
          tabBarIcon: ({ focused }) => (
            <Image source={ focused ? ( theme === 'pink' ? icons.articleFocused : icons.articleFocusedOrange ) : (theme === 'pink' ? icons.article : icons.articleWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          ) 
         }}
      />
      <Tab.Screen name="Forum" component={ForumScreen} 
         options={{
          tabBarIcon: ({ focused }) => (
            <Image source={ focused ? ( theme === 'pink' ? icons.forumFocused : icons.forumFocusedOrange ) : (theme === 'pink' ? icons.forum : icons.forumWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          ) 
         }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={ focused ? ( theme === 'pink' ? icons.settingFocused : icons.settingFocusedOrange ) : (theme === 'pink' ? icons.seting : icons.settingWhite)} style={{ height: focused ? 30 : 24, width: focused ? 60 : 24 }} />
          ) 
         }}
      />
    </Tab.Navigator>
  );
};


export default Main;
