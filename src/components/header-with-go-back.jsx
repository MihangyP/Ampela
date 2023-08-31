import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SIZES, icons, COLORS } from '../../constants';


const HeaderWithGoBack = ({navigation, title, iconLeft, onIconLeftPress}) => {
    return (
        
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 10}}>
                        <Image source={icons.backLeft} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <Text style={styles.medium}>{title}</Text>
                { 
                  iconLeft ? 
                  <TouchableOpacity onPress={onIconLeftPress}>
                      <Image source={iconLeft} style={{ width: 22, height: 22 }} />
                  </TouchableOpacity>
                  : null
                }
            </View>
        
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    medium: {
        fontFamily: "Medium",
        fontSize: SIZES.medium,
    },
})


export default HeaderWithGoBack;