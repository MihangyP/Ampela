import {useContext} from 'react';
import { ImageBackground } from 'react-native';
import { images } from '../../constants';
import { ThemeContext } from './theme-context';

const BackgroundContainer = ({children, paddingBottom}) => {
    const {theme} = useContext(ThemeContext);
    return (
        <ImageBackground source={theme === 'pink' ? images.bgRose : images.bgOrange } resizeMode='repeat' style={{ flex: 1, paddingHorizontal: 20, paddingBottom: paddingBottom ? paddingBottom : null}} >
            {children}
        </ImageBackground>
    );
}

export default BackgroundContainer;