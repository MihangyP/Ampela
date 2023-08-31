import {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable} from 'react-native';
import { useTranslation } from 'react-i18next';
import {COLORS, SIZES, icons, images} from '../../constants';
import CommentContent from './comment-content';
import { RFValue } from 'react-native-responsive-fontsize';

const ForumItem = () => {
    const {t} = useTranslation();
    const [isLikeIconPressed, setIsLikeIconPressed] = useState(false);
    const [isCommentIconPressed, setIsCommentIconPressed] = useState(false);
    const [numberOfLike, setNumberOfLike]= useState(16);

    const handleLikeIconPress = () => {
        setIsLikeIconPressed(v => !v);
        if(isLikeIconPressed) {
            setNumberOfLike(v => v - 1);
        } else {
            setNumberOfLike(v => v + 1);
        }
    }

    const handleCommentIconPress = () => {
       setIsCommentIconPressed(v => !v) 
    }

    return (
        <View nestedScrollEnabled style={styles.container}>
            <View style={styles.header}>
                <Image source={images.user01} style={{width: 44, height: 44}}/>
                <View>
                    <Text style={styles.textSmall}>Charline Bukowski</Text>
                    <Text style={styles.textSmall}>25/06/23</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.questionItem}>Comment se sent-on durant les règles?</Text>
            </View>
            <View style={styles.reactions}>
                <View style={styles.like}>
                    <Pressable onPress={handleLikeIconPress}>
                        <Image source={isLikeIconPressed ? icons.heartFill : icons.heart} style={{width: 24, height: 22}}/>
                    </Pressable>
                    <Text style={styles.textSmall}>{numberOfLike} {t('reactions')}</Text>
                </View>
                <Pressable style={styles.comment} onPress={handleCommentIconPress}>
                    <Image source={icons.message} style={{width: 24, height: 24}}/>           
                    <Text style={styles.textSmall}>15 {t('commentaires')}</Text>
                </Pressable>
            </View>
           {
             isCommentIconPressed ? <CommentContent/> : null
           }
            <View style={styles.commentBox}>
                 <TextInput
                      placeholder={t('ecrireUnCommentaire')}
                      style={{width: "90%", height: "100%", fontFamily: "Regular"}}
                 />
                 <Image source={icons.send} style={{width: 19, height: 18}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.neutral100,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10
    },
    header: {
        flexDirection: "row",
        gap: 8
    },
    content: {
        marginVertical: 20
    },
    questionItem: {
        fontFamily: 'SBold',
        fontSize: RFValue(SIZES.large)
    },
    reactions: {
        flexDirection: "row",
        gap: 20
    },
    textSmall: {
        fontFamily: "Regular",
        fontSize: RFValue(SIZES.small)
    },
    like: {
        flexDirection: "row",
        gap: 10
    },
    comment: {
        flexDirection: "row",
        gap: 10
    },
    commentBox: {
        width: "100%",
        height: 45,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 15,
        marginTop: 20
    }
})

export default ForumItem;