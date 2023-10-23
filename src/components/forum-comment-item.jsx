import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CommentItem = ({ authorPic, authorName, creationDate, content }) => {
    return (
        <View style={{ marginVertical: 10 }}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <Image source={authorPic} style={styles.img} />
                    <View>
                        <Text style={styles.txt}>{authorName}</Text>
                        <Text style={styles.txt}>{creationDate}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 5
    },
    img: {
        width: 24,
        height: 24,
        borderRadius: 100,
    },
    txt: {
        fontFamily: "Regular"
    },
    content: {
        color: "#ccc",
        fontFamily: "Regular",
        marginVertical: 5
    }
});

export default CommentItem;
