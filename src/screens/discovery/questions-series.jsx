import { useCallback, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { ResponseOfQuestion0, ResponseOfQuestion1 } from '../../components/response-of-question';
import { COLORS, SIZES } from "../../../constants";
import { RFValue } from 'react-native-responsive-fontsize';
import { connectDB, addDataSignup } from '../../../config/databaseLocalConfig';

const QuestionsSeries = ({navigation, route}) => {
    const {selected,nomDutilisateur,motDePasse,profession} = route.params;
    const {t} = useTranslation();

    const [response0, setResponse0] = useState(null);
    const [response1, setResponse1] = useState(null); 
    const dontRememberText = t('jeMenSouviensPas');

    const handleResponsePress0 = useCallback((item) => {
        setResponse0(item);
      }, []);
    const handleResponsePress1 = useCallback((item) => {
        setResponse1(item);
      }, []); 
   
    const menstruationDurations = [];
    const cycleDurations = [];
    
      for(let i = 2; i < 46; i++) {
        let text = null;
        if(i > 2 && i < 8) {
            text = i + " " + t('jours');
            menstruationDurations.push(text);
        } 
        if(i > 20 && i < 46) {
            text = i + " " + t('jours');
            cycleDurations.push(text);
        }
      }

    const handleNextBtnPress = () => {
        if(response0 && response1 ) {
            connectDB();
            addDataSignup({
                
            })
            navigation.navigate('CalendarScreen',{
                
            });
        } else {
            Alert.alert("Veuiller repondre à toutes les questions...")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentItem}>
                    <Text style={styles.question}>{t('dureeDeVosRegles')}</Text>
                    <FlatList 
                        data={menstruationDurations}
                        renderItem={({item}) => (<ResponseOfQuestion0 text={item} active={response0 === item ? true : false} onPress={() => handleResponsePress0(item)}/>)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                </View><View style={styles.contentItem}>
                    <Text style={styles.question}>{t('dureeDeVotreCycle')}</Text>
                    <FlatList 
                        data={cycleDurations}
                        renderItem={({item}) => (<ResponseOfQuestion1 text={item} active={response1 === item ? true : false}  onPress={() => handleResponsePress1(item)}/>)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                    <View style={{ marginTop: 15 }}>
                        <ResponseOfQuestion1 text={dontRememberText} active={response1 === dontRememberText ? true : false}  onPress={() => handleResponsePress1(dontRememberText)}/>
                    </View>
                </View>
            </View>
            <View style={styles.btnBox}>
                <Button
                    bgColor={COLORS.accent600}
                    textColor={COLORS.neutral100}
                    borderRadius={15}
                    onPress={handleNextBtnPress}
                >
                    {t('suivant')}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral100
    },
    content: {
        marginTop: "30%",
        paddingLeft: 20
    },
    contentItem: {
        marginTop: 15
    },
    question: {
        fontFamily: "Bold",
        fontSize: RFValue(SIZES.xLarge),
        marginBottom: 8
    },
    
    btnBox: {
        position: "absolute",
        bottom: 30,
        marginLeft: 20
    }
})

export default QuestionsSeries;
