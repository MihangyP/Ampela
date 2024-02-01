import { useRef, useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  TextArea,
  ActivityIndicator
} from "react-native";
import { useTranslation } from "react-i18next";
import HeaderForum from "../../components/header-forum";
import ForumItem from "../../components/forum-item";
import { ThemeContext } from "../../components/theme-context";
import { COLORS, SIZES } from "../../../constants";
import BackgroundContainer from "../../components/background-container";
import { RFValue } from "react-native-responsive-fontsize";
import { addNewPost } from "../../../config/firestoreAPI";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../../../config/firebaseConfig";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "../../components/custom-drawer-content";

const Drawer = createDrawerNavigator();

const DoctorForumScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const screenWidth = Dimensions.get("window").width + 200;
  const translateXAnim = useRef(new Animated.Value(screenWidth)).current;
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);


  useEffect(() => {

    const unsubscribe = onSnapshot(
      query(collection(database, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => doc.data());

        setPosts(newPosts);
      }
    );


    return () => unsubscribe();
  }, []);

  const handleAskQuestionBtnPress = () => {
    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelBtnPress = () => {
    setIsInputsDisabled(false);
    Animated.timing(translateXAnim, {
      toValue: screenWidth,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  const handleSendBtnPress = async () => {

    setIsInputsDisabled(true);
    setIsLoading(true);
    const newPostData = {
      content: newPostContent,
      authorId: getAuth().currentUser.uid,
      like: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Appel de la fonction addNewPost pour ajouter le nouveau post
    try {
      const response = await addNewPost(newPostData);
      if (response && response.msg === "no-auth") {
        console.log("L'utilisateur n'est pas authentifié.");
      } else {
        console.log("Nouveau post ajouté avec succès.");

        setIsFormOpen(false);
        setNewPostContent("");

        Animated.timing(translateXAnim, {
          toValue: screenWidth,
          duration: 0,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau post : ", error);
    } finally {

      setIsInputsDisabled(false);
      setIsLoading(false);
    }
  };


  const childScrollViewRef = useRef(null);

  const handleParentScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (childScrollViewRef.current) {
      childScrollViewRef.current.scrollTo({ y: offsetY });
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundContainer paddingBottom={85}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}

        <Animated.View
          style={[
            styles.containerBox,
            {
              transform: [{ translateX: translateXAnim }],
            },
          ]}
        >
          <View style={styles.box}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.askQuestionTextInput}
              onChangeText={(text) => setNewPostContent(text)}
              placeholder="Posez ici vos questions sur les règles, la contraception, la planification familiale, etc..."
              value={newPostContent}
              editable={!isInputsDisabled}
            />
            <View style={styles.btnBox}>
              <TouchableOpacity style={[styles.btnInsideBox, { backgroundColor: COLORS.neutral400 }]} onPress={handleCancelBtnPress} disabled={isInputsDisabled}>
                <Text style={{ fontFamily: "Bold", color: COLORS.neutral100, fontSize: SIZES.small }}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnInsideBox, { backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800 }]} onPress={handleSendBtnPress} disabled={isInputsDisabled}>
                <Text style={{ fontFamily: "Bold", color: COLORS.neutral100, fontSize: SIZES.small }}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <HeaderForum navigation={navigation} isDoctor={false} screen={"DoctorMessageScreen"} />
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme === 'pink' ? COLORS.accent600 : COLORS.accent800 }]} onPress={handleAskQuestionBtnPress}>
          <Text style={styles.textBtn}>{t('posezVotreQuestion')}</Text>
        </TouchableOpacity>

        <ScrollView onScroll={handleParentScroll} showsVerticalScrollIndicator={false}>
          {posts.map((post) => (
            <ForumItem key={post.createdAt.toMillis()} post={post} refToCommentItem={childScrollViewRef} navigation={navigation} />
          ))}
        </ScrollView>
      </BackgroundContainer>
    </View>
  );
};

function MainDoctorScreen() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="DoctorForumScreen" component={DoctorForumScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: 30000,
  },
  loadingContainer: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 30001,
  }
  ,
  box: {
    width: "90%",
    height: 316,
    backgroundColor: COLORS.neutral100,
    borderRadius: 10,
    marginTop: 90,
    marginLeft: "5%",
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  btnInsideBox: {
    width: 138,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99
  },
  askQuestionTextInput: {
    width: "90%",
    marginLeft: "5%",
    marginTop: 20,
    borderWidth: 2,
    borderColor: COLORS.neutral200,
    height: 200,
    borderRadius: 10,
    fontFamily: "Medium",
    padding: 10,
  },
  container: {
    flex: 1,
  },
  btn: {
    width: "100%",
    height: 44,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  textBtn: {
    color: COLORS.neutral100,
    fontFamily: "Bold",
    fontSize: RFValue(SIZES.small),
  },
});

export default MainDoctorScreen;
