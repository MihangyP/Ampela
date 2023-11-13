import React, { useContext, useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TextInput,
} from "react-native";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import HeaderWithGoBack from "../../components/header-with-go-back";
import { ThemeContext } from "../../components/theme-context";
import { useTranslation } from "react-i18next";
import { COLORS, icons } from "../../../constants";
import MessageItem from "../../components/messageItem";
import { auth, database } from "../../../config/firebaseConfig";

const DoctorMessageScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [users, setUsers] = useState([]);
    const currentUserUid = auth.currentUser.uid;
    const [refreshList, setRefreshList] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = (text) => {
        setSearchText(text);
    };
    const handleMessageItemPress = (user) => {
        navigation.navigate("MessageContentScreen", {
            user,
            onMessageSent: () => {
                fetchUsers();
            },
            handleRefreshList,
        });
    };

    const handleRefreshList = () => {
        setRefreshList(!refreshList);
        setUsers([]);
    };

    const fetchUsers = () => {
        const db = database;
        const usersCollectionRef = collection(db, "users");

        const unsubscribeUsers = onSnapshot(usersCollectionRef, (snapshot) => {
            const unsubscribeMessages = [];
            const userList = [];

            snapshot.forEach((doc) => {
                const userData = doc.data();
                console.log(currentUserUid);
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

                    const unsubscribe = onSnapshot(
                        query(
                            messagesCollectionRef,
                            orderBy("createdAt", "desc"),
                            limit(1)
                        ),
                        (messagesSnapshot) => {
                            const lastMessage = messagesSnapshot.docs[0]?.data();

                            userList.push({
                                ...userData,
                                lastMessage: lastMessage?.text || "",
                                lastMessageCreatedAt:
                                    lastMessage?.createdAt?.seconds * 1000 || 0,
                            });

                            if (userList.length === snapshot.size - 1) {
                                userList.sort(
                                    (a, b) => b.lastMessageCreatedAt - a.lastMessageCreatedAt
                                );
                                setUsers(userList);
                            }
                        }
                    );

                    unsubscribeMessages.push(unsubscribe);
                }
            });

            return () => {
                unsubscribeMessages.forEach((unsubscribe) => unsubscribe());
                unsubscribeUsers();
            };
        });

        // const newMessageEvent = EventListener.listen("newMessageSent", () => {
        //   fetchUsers();
        // });
    };

    useEffect(() => {
        fetchUsers();
    }, [refreshList]);

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
                        onChangeText={(text) => {
                            handleSearch(text);
                            const sanitizedText = text.replace(
                                /[-[\]{}()*+?.,\\^$|#\s]/g,
                                "\\$&"
                            );
                            const regex = new RegExp(sanitizedText, "i");
                            const usersFiltered = users.filter((i) => regex.test(i.pseudo));
                            setFilteredUsers(usersFiltered);

                            console.log(filteredUsers);
                        }}
                    />
                    <Image source={icons.search} style={{ height: 24, width: 24 }} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {searchText !== ""
                    ? filteredUsers.map((user, index) => (
                        <MessageItem
                            key={user.uid}
                            urlImg={{
                                uri:
                                    "https://i.pravatar.cc/" +
                                    (Math.floor(Math.random() * 1000) + 1),
                            }}
                            name={user.pseudo}
                            job={user.email}
                            lastMessage={user.lastMessage}
                            onPress={() => handleMessageItemPress(user)}
                            customStyles={{ marginBottom: 10 }}
                        />
                    ))
                    : users.map((user, index) => (
                        <MessageItem
                            key={user.uid}
                            urlImg={{
                                uri:
                                    "https://i.pravatar.cc/" +
                                    (Math.floor(Math.random() * 1000) + 1),
                            }}
                            name={user.pseudo}
                            job={user.email}
                            lastMessage={user.lastMessage}
                            onPress={() => handleMessageItemPress(user)}
                            customStyles={{ marginBottom: 10 }}
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

export default DoctorMessageScreen;
