import {useState, useCallback, useContext} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList} from 'react-native';
import HeaderWithGoBack from '../../components/header-with-go-back';
import { COLORS, SIZES, images, icons } from '../../../constants'; 
import { ThemeContext } from '../../components/theme-context';
import {StateItem1, StateItem2, StateItem3} from '../../components/settings/state-item';

const FLUX_DATA = ["Léger", "Normal", "Abondant"];
const SYMPTOMS_DATA = ["Acné", "Ballonnement", "Crampe", "Douleur de dos"];
const EMOTIONS_DATA = ["Calme", "Heureux", "Triste", "Stressé"];

const AccountScreen = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
    const [flux, setFlux] = useState(null);
    const [symptom, setSymptom] = useState(null);
    const [emotion, setEmotion] = useState(null);
    // callbacks
    const handleFluxPress = useCallback((item) => {
        setFlux(item);
    }, []);
    const handleSymptomPress = useCallback((item) => {
        setSymptom(item);
    }, []);
    const handleEmotionPress = useCallback((item) => {
        setEmotion(item);
    }, []); 
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, {backgroundColor: theme === 'pink' ? COLORS.neutral200 : COLORS.neutral100}]}>
            <HeaderWithGoBack title="Compte" navigation={navigation} />
            <View style={styles.profil}>
                <Image source={images.user02} />
                <TouchableOpacity style={styles.flex}>
                    <Text style={[styles.uploadImgText, {color: theme === 'pink' ? COLORS.accent600 : COLORS.accent800}]}>Changer la photo</Text>
                    <Image source={theme === 'pink' ? icons.uploadIcon : icons.uploadOrangeIcon} style={styles.uploadImg} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value='Eleanor Pena' style={styles.input} />
                <TextInput value='eleanorpena@gmail.com' style={styles.input} />
                <TextInput placeholder='Nouveau mail' style={styles.input} />
                <TouchableOpacity style={[styles.saveBtn, {backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800}]}>
                    <Text style={{fontFamily: "Medium", color: COLORS.neutral100, fontSize: SIZES.small}}>Sauvegarder</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.title}>Flux</Text>
                <FlatList
                  data={FLUX_DATA}
                  renderItem={({item}) => {
                    let urlImg = null;
                    switch(item) {
                        case "Léger":
                            urlImg = icons.fluxLegerIcon;
                            break;
                        case "Normal":
                            urlImg = icons.fluxNormalIcon;
                            break;
                        case "Abondant":
                            urlImg = icons.fluxAbondantIcon;
                            break;
                        default:
                            return;
                    }
                    return (
                        <StateItem1 text={item} active={ flux === item ? true : false } urlImg={urlImg} onPress={() => handleFluxPress(item)} />
                      )
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
            </View>
            <View>
                <Text style={styles.title}>Symptômes</Text>
                <FlatList
                  data={SYMPTOMS_DATA}
                  renderItem={({item}) => {
                    let urlImg = null;
                    switch(item) {
                        case "Acné":
                            urlImg = icons.acneIcon;
                            break;
                        case "Ballonnement":
                            urlImg = icons.ballonnementIcon;
                            break;
                        case "Crampe":
                            urlImg = icons.crampeIcon;
                            break;
                        case "Douleur de dos":
                            urlImg = icons.douleurDeDosIcon;
                            break;
                        default:
                            return;
                    }
                    return (
                        <StateItem2 text={item} urlImg={urlImg} active={symptom === item ? true : false} onPress={() => handleSymptomPress(item)} />
                      )
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
            </View>
            <View>
                <Text style={styles.title}>Emotions</Text>
                <FlatList
                  data={EMOTIONS_DATA}
                  renderItem={({item}) => {
                    let urlImg = null;
                    switch(item) {
                        case "Calme":
                            urlImg = icons.calmeIcon;
                            break;
                        case "Heureux":
                            urlImg = icons.heureuxIcon;
                            break;
                        case "Triste":
                            urlImg = icons.tristeIcon;
                            break;
                        case "Stressé":
                            urlImg = icons.stresseIcon;
                            break;
                        default:
                            return;
                    }
                    return (
                        <StateItem3 text={item} urlImg={urlImg} active={emotion === item ? true : false} onPress={() => handleEmotionPress(item)} />
                      )
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profil: {
        alignItems: "center",
        gap: 15,
        paddingVertical: 30
    },
    uploadImgText: {
        fontFamily: 'Regular',
        fontSize: SIZES.small,
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    uploadImg: {
        width: 20,
        height: 20
    },
    inputContainer: {
        gap: 10,
        marginBottom: 20 
    },
    input: {
        fontFamily: 'Regular',
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.neutral100
    },
    saveBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        alignSelf: 'flex-end'
    },
    title: {
        fontFamily: "SBold",
        fontSize: SIZES.xLarge,
        marginBottom: 15,
        marginTop: 20
    }
})

export default AccountScreen;