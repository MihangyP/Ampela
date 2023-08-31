import {useState} from 'react';
import { View, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import {SIZES, icons } from '../../constants';

const SearchArticles = ({text, onChange}) => {
    const { t } = useTranslation();
    const handleTextInputChange = (inputText) => {
        onChange(inputText);
    } 
    const handleIconRightPress = () => {
        if(text !== '') {
            onChange('');
        }
    }
    return (
        <View style={styles.container}>
            <TextInput 
              style={{fontFamily: 'Medium', fontSize: SIZES.medium, width: '90%'}}
              placeholder={t('rechercher')}
              value={text}
              onChangeText={handleTextInputChange}
            />
            <Pressable onPress={handleIconRightPress}>
            <Image  source={text === '' ? icons.search : icons.close } style={{width: 24, height: 24}} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       width: '100%',
       marginVertical: 10,
       backgroundColor: "rgba(255, 255, 255, .6)",
       borderRadius: 100, 
       paddingVertical: 10,
       paddingHorizontal: 15,
       flexDirection: 'row',
       justifyContent: "space-between"
    }
})

export default SearchArticles;