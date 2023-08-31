import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import HeaderWithGoBack from "../../components/header-with-go-back";
import { ThemeContext } from "../../components/theme-context";
import { useTranslation } from "react-i18next";
import { COLORS, images, icons } from "../../../constants";
import MessageItem from "../../components/messageItem";
import { database, auth } from "../../../config/firebase";

const MessageScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);

  const currentUserUid = auth.currentUser.uid;

  const fetchUsers = async () => {
    const db = database;
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const userList = [];
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.uid !== currentUserUid) {
        const conversationId =
          currentUserUid < userData.uid
            ? `${currentUserUid}_${userData.uid}`
            : `${userData.uid}_${currentUserUid}`;
        const messagesCollectionRef = collection(
          db,
          "conversations",
          conversationId,
          "messages"
        );
        const messagesQuerySnapshot = await getDocs(
          query(messagesCollectionRef, orderBy("createdAt", "desc"), limit(1))
        );
        const lastMessage = messagesQuerySnapshot.docs[0]?.data();

        userList.push({
          ...userData,
          lastMessage: lastMessage?.text || "",
        });
      }
    }

    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMessageItemPress = (user) => {
    navigation.navigate("MessageContentScreen", {
      user: user,
    });
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
      <HeaderWithGoBack navigation={navigation} title={t("message")} />
      <View style={{ marginVertical: 30 }}>
        <View
          style={[styles.inputBox, { borderWidth: theme === "pink" ? 0 : 1 }]}
        >
          <TextInput
            style={{ fontFamily: "Medium", width: "90%" }}
            placeholder={t("rechercher")}
          />
          <Image source={icons.search} style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView>
        {users.map((user, index) => (
          <MessageItem
            key={index}
            urlImg={{ uri: "https://i.pravatar.cc/200" }}
            name={user.pseudo}
            job={user.email}
            lastMessage={
              user.lastMessage
            }
            onPress={() => handleMessageItemPress(user)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  inputBox: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.neutral100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 99,
  },
});

export default MessageScreen;
