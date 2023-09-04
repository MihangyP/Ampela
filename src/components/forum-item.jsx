/*****************************************************************************
 * -Correction date: 30/08/2023
 * -Fixing bug: mis en place de "props" sur l'argument de composant "ForumItem" 
 * pour faciliter le passage des données concernant l'utilisateur qui publie 
 * un post dans le forum de partage.
 * -Props list: postId
 *****************************************************************************/

import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, SIZES, icons } from '../../constants';
import CommentContent from './comment-content';

const ForumItem = ({ postId }) => {
    const { t } = useTranslation();
    const [ isLikeIconPressed, setIsLikeIconPressed ] = useState(false);
    const [ isCommentIconPressed, setIsCommentIconPressed ] = useState(false);
    const [ commentValue, setCommentValue ] = useState("");

    const currProps = {
        postId: postId, 
        authorId: "", 
        authorPic: "", 
        authorName: "", 
        creationDate: "", 
        content: "", 
        likeNum: 0, 
        commentNum: 0 
    };

    // Gère l'icône de like
    const handleLikeIconPress = () => {
        setIsLikeIconPressed(v => !v);
    }

    // Gère l'affichage de la section de commentaire
    const handleCommentIconPress = () => {
       setIsCommentIconPressed(v => !v) 
    }

    // Gère l'envoi du nouveau commentaire
    const handleCommentSent = () => {
        if (commentValue != "") {
            console.log('commentaire rempli');
        } else {
            console.log('commentaire vide');
        }
    }

    return (
        <View nestedScrollEnabled style={ styles.container }>
            {/* Partie en-tête du pub */}
            <View style={ styles.header }>
                <Image source={ currProps.authorPic } style={{ width: 44, height: 44 }}/>
                <View>
                    <Text style={ styles.textSmall }>{ currProps.authorName }</Text>
                    <Text style={ styles.textSmall }>{ currProps.creationDate }</Text>
                </View>
            </View>

            {/* Partie corps du pub */}
            <View style={ styles.content }>
                <Text style={{ fontFamily: "SBold", fontSize: SIZES.large }}>{ currProps.content }</Text>
            </View>

            {/* Partie de like et commentaire */}
            <View style={ styles.reactions }>
                <View style={ styles.like }>
                    <Pressable onPress={ handleLikeIconPress }>
                        <Image source={ isLikeIconPressed ? icons.heartFill : icons.heart } style={{ width: 24, height: 22 }}/>
                    </Pressable>
                    <Text style={styles.textSmall}>{currProps.likeNum} {t('reactions')}</Text>
                </View>
                <Pressable style={ styles.comment } onPress={ handleCommentIconPress }>
                    <Image source={ icons.message } style={{ width: 24, height: 24 }}/>           
                    <Text style={ styles.textSmall }>{ currProps.commentNum } { t('commentaires') }</Text>
                </Pressable>
            </View>

            {/* Partie conditionelle pour l'affichage des commentaire par les users qui ont commenté */}
            { isCommentIconPressed ? <CommentContent postId={ currProps.postId } /> : null }

            {/* Partie pour l'entré d'un nouveau commentaire */}
            <View style={styles.commentBox}>
                {/* Zone pour le remplissage du contenu du commentaire */}
                <TextInput
                placeholder={ t('ecrireUnCommentaire') } 
                style={{ width: "90%", height: "100%", fontFamily: "Regular" }} 
                value={ commentValue } onChangeText={ setCommentValue } />

                {/* Icône pressable pour la soummission du nouveau commentaire */}
                <Pressable onPress={ handleCommentSent } >
                    <Image source={ icons.send } style={{ width: 19, height: 18 }} />
                </Pressable>
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
    reactions: {
        flexDirection: "row",
        gap: 20
    },
    textSmall: {
        fontFamily: "Regular",
        fontSize: SIZES.small
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