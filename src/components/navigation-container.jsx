import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './theme-context';
import DiscoveryScreen from '../screens/discovery/discovery-screen';
import PersonalHealthTestScreen from '../screens/discovery/personal-health-test-screen';
import LastMenstrualCycleStartAge from '../screens/discovery/last-menstrual-cycle-start-age';
import QuestionsSeries from '../screens/discovery/questions-series';
import AuthentificationScreen from '../screens/discovery/authentification-screen';
import Main from '../screens/main';
import SignUpScreen from '../screens/discovery/signup-screen';
import LogInScreen from '../screens/discovery/login-screen';
import MessageScreen from '../screens/messages/message-screen';
import NotificationScreen from '../screens/forum/notification-screen';
import SettingsScreen from '../screens/settings/settings-screen';
import ChangeLanguageScreen from '../screens/settings/change-language-screen';
import FaqScreen from '../screens/settings/faq-screen';
import InfoScreen from '../screens/settings/info-screen';
import MessageContentScreen from '../screens/messages/message-content-screen';
import DoctorInformationScreen from '../screens/messages/doctor-information-screen';
import DoctorForumScreen from '../screens/forum/doctor-forum-screen';
import ThemeScreen from '../screens/settings/theme-screen';
import DoctorAuthScreen from '../screens/discovery/doctor-auth-screen';
import ArticleContentScreen from '../screens/articles/article-content-screen';
import AccountScreen from '../screens/settings/account-screen';
import UsernameAndPasswordScreen from '../screens/discovery/username-and-password-screen';

const Stack = createNativeStackNavigator();

const ContainerNavigation = ({onLayout}) => {
    return (
        <ThemeProvider>
            <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='Discovery'
            >
                {/* <Stack.Screen name="Discovery" component={DiscoveryScreen} />
                <Stack.Screen name="PersonalHealthTestScreen" component={PersonalHealthTestScreen} />
                <Stack.Screen name="LastMenstrualCycleStartAge" component={LastMenstrualCycleStartAge} />
                <Stack.Screen name="QuestionsSeries" component={QuestionsSeries} /> */}
                <Stack.Screen name="AuthentificationScreen" component={AuthentificationScreen} />
                <Stack.Screen name="CalendarScreen" component={Main} />
                {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
                <Stack.Screen name="LogInScreen" component={LogInScreen} />
                <Stack.Screen name="MessageScreen" component={MessageScreen} />
                {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                <Stack.Screen name="ChangeLanguageScreen" component={ChangeLanguageScreen} />
                <Stack.Screen name="FaqScreen" component={FaqScreen} />
                <Stack.Screen name="InfoScreen" component={InfoScreen} /> */}
                <Stack.Screen name="MessageContentScreen" component={MessageContentScreen} />
                {/* <Stack.Screen name="DoctorInformationScreen" component={DoctorInformationScreen} />
                <Stack.Screen name="DoctorAuthScreen" component={DoctorAuthScreen} />
                <Stack.Screen name="DoctorForumScreen" component={DoctorForumScreen} />
                <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
                <Stack.Screen name="ArticleContentScreen" component={ArticleContentScreen} />
                <Stack.Screen name="AccountScreen" component={AccountScreen} />
                {/* <Stack.Screen name="UsernameAndPasswordScreen" component={UsernameAndPasswordScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
        </ThemeProvider>
    )
}

export default ContainerNavigation;