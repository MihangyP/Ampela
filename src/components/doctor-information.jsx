import React from 'react';
import { View, Text, Image } from 'react-native';
import {icons, SIZES} from '../../constants';

const DoctorInformation = ({as, title}) => {
    let iconUrl = null;
    switch (as) {
        case 'job':
            iconUrl = icons.jobIcon;
            break;
        case 'adress':
            iconUrl = icons.localisationIcon;
            break;
        case 'mail': 
            iconUrl = icons.mailIcon;
            break;
        case 'num':
            iconUrl = icons.phoneIcon;
            break;
        default:
            return null;
    }
    return (
        <View style={{flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 40}}>
            <Image source={iconUrl} style={{width: 18, height: 18}} />
            <Text style={{
                fontFamily: "Regular",
                fontSize: SIZES.medium
            }}>{title}</Text>
        </View>
    );
}

export default DoctorInformation;