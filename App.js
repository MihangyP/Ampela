import { useCallback } from 'react';
import {View, Text} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ContainerNavigation from "./src/components/navigation-container";
import './src/i18n';
    
SplashScreen.preventAutoHideAsync();

const App = () => {
    const [fontsLoaded] = useFonts({
        'Regular': require('./assets/Fonts/WorkSans-Regular.ttf'),
        'Medium': require('./assets/Fonts/WorkSans-Medium.ttf'),
        'SBold': require('./assets/Fonts/WorkSans-SemiBold.ttf'),
        'Bold': require('./assets/Fonts/WorkSans-Bold.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [!fontsLoaded]);
  
    if(!fontsLoaded) {
        return null;
    }

    return <ContainerNavigation />
    
    // return <View>
    //     <Text>Hello</Text>
    // </View>
    
}

export default App;