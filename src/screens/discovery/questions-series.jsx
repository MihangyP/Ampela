import { useCallback, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { ResponseOfQuestion0, ResponseOfQuestion1 } from '../../components/response-of-question';
import { COLORS, SIZES } from "../../../constants";
import { RFValue } from 'react-native-responsive-fontsize';
import * as SQLite from 'expo-sqlite';
// import { openDatabase } from '../../../config/databaseLocalConfig';
// import { connectlocalDb, addDataSignup,displayAllUserData } from '../../../config/databaseLocalConfig';

const QuestionsSeries = ({navigation, route}) => {
    const {user} = route.params;
    console.log(route.params);
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
        if (response0 && response1) {
          console.log(user.nomDutilisateur + ',' + user.motDePasse + ',' + user.profession + ',' + user.selected + ',' + response0 + ',' + response1 + 'kghfr');
      
          try {
           
      
            // Requête SQL pour vérifier si l'utilisateur existe dans la base de données SQLite
            const query = 'SELECT COUNT(*) FROM users WHERE username = ?';
            DB.transaction((tx) => {
              tx.executeSql(query, [user.nomDutilisateur], (_, { rows }) => {
                if (rows.length > 0) {
                  // L'utilisateur n'existe pas encore, insérez-le
                  const InsertUser = 'INSERT INTO users (username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) VALUES(?,?,?,?,?,?)';
                  const values = [
                    user.nomDutilisateur,
                    user.motDePasse,
                    user.profession,
                    user.selected,
                    response0,
                    response1
                  ];
      
                  DB.transaction((tx) => {
                    tx.executeSql(InsertUser, values, (_, result) => {
                      console.log('Utilisateur inséré avec succès.');
                    });
                  });
                } else {
                  // L'utilisateur existe déjà, vous pouvez gérer ce cas ici
                  console.log('L\'utilisateur existe déjà.');
                }
              });
            });
          } catch (error) {
            console.error('Erreur lors de l\'ajout d\'utilisateur :', error);
            throw error;
          }
          // displayAllUserData();
          async function getAllUserDataFromDatabase() {
            try {
              const DB = SQLite.openDatabase('ampela.db');
              
              // Requête SQL pour sélectionner toutes les données des utilisateurs
              const query = 'SELECT * FROM users';
              
              DB.transaction((tx) => {
                tx.executeSql(query, [], (_, result) => {
                  const rows = result.rows;
          
                
                    console.log("Données des utilisateurs :");
                    console.log("rows: ", rows.length);
                    // for (let i = 0; i < rows.length; i++) {
                    //   const user = rows.item(i);
                    //   console.log(`Utilisateur ${i + 1}:`);
                    //   console.log("ID :", user.id);
                    //   console.log("Nom d'utilisateur :", user.username);
                    //   console.log("Profession :", user.profession);
                    //   console.log("Date de menstruation :", user.lastMenstruationDate);
                    //   console.log("Durée des menstruations :", user.durationMenstruation);
                    //   console.log("Durée du cycle :", user.cycleDuration);
                    //   // Ajoutez d'autres propriétés ici selon votre schéma de base de données.
                    // }
                  
                    console.log("Aucun utilisateur trouvé.");
                  
                });
              });
            } catch (error) {
              console.error("Une erreur s'est produite lors de la récupération des données :", error);
            }
          }
          
          // Appelez la fonction pour récupérer et afficher les données des utilisateurs dans la console.
          getAllUserDataFromDatabase();
          
          
          navigation.navigate('CalendarScreen', {
      
          });
        } else {
          Alert.alert("Veuillez répondre à toutes les questions...")
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
