import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { ThemeContext } from "../../components/theme-context";
import HeaderWithGoBack from "../../components/header-with-go-back";
import { SIZES, COLORS, icons } from "../../../constants";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { database, auth } from "../../../config/firebase";

const MessageContentScreen = ({ navigation, route }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = route.params;
  const { pseudo, job, email, uid } = user;

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

  useEffect(() => {
    const currentUserUid = currentUser.uid;
    const currentUserId = currentUserUid < uid ? currentUserUid : uid;
    const targetUserId = currentUserUid < uid ? uid : currentUserUid;

    const conversationId = `${currentUserId}_${targetUserId}`;

    const messagesCollectionRef = collection(
      database,
      "conversations",
      conversationId,
      "messages"
    );
    const q = query(messagesCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((doc) => {
        const messageData = doc.data();
        console.log(doc.data());
        console.log(targetUserId);
        if (messageData.createdAt && messageData.createdAt.seconds) {
          newMessages.push({
            _id: doc.id,
            text: messageData.text,
            createdAt: new Date(messageData.createdAt.seconds * 1000),
            user: {
              _id: messageData.expediteur._id, 
              name: messageData.expediteur.pseudo, 
              avatar: messageData.expediteur.avatar,
            },
          });
          
        }
      });

      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const onSend = useCallback(
    async (newMessages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );

      const currentUserUid = currentUser.uid;
      const currentUserId = currentUserUid < uid ? currentUserUid : uid;
      const targetUserId = currentUserUid < uid ? uid : currentUserUid;
      const conversationId = `${currentUserId}_${targetUserId}`;

      newMessages.forEach((message) => {
        const { _id, text } = message;

        const newMessage = {
          _id,
          createdAt: serverTimestamp(),
          text,
          expediteur: {
            _id: currentUserUid,
            pseudo: currentUser.displayName || "unknown",
            avatar: "https://i.pravatar.cc/300",
          },
          destinateur: {
            _id: uid,
            pseudo: pseudo || "unknown",
            avatar: "https://i.pravatar.cc/300",
          },
        };

        addDoc(
          collection(database, "conversations", conversationId, "messages"),
          newMessage
        )
          .then(() => {
            console.log("Message sent successfully!");
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      });
    },
    [currentUser, uid, pseudo]
  );

  const renderBubble = (props) => {
    // console.log("currentMessage:", props.currentMessage);
    // console.log("currentMessage.user:", props.currentMessage.user);
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
          },
          right: {
            backgroundColor: COLORS.accent500,
          },
        }}
        textStyle={{
          left: {
            color: COLORS.black,
          },
          right: {
            color: "white",
          },
        }}
        // position={
        //   props.user._id === currentUser.uid ? "right" : "left"
        // }
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "pink" ? COLORS.neutral200 : COLORS.neutral100,
        },
      ]}
    >
      <HeaderWithGoBack
        navigation={navigation}
        title={pseudo}
        iconLeft={icons.info}
      />
      <GiftedChat
      style={{padding:10}}
        messages={messages.map((message) => ({
          ...message,
          _id: message._id.toString(),
        }))}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: currentUser.uid, name: currentUser.displayName }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageContentScreen;
