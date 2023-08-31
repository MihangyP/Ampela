import { useContext } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderForum from "../../components/header-forum";
import CustomDrawerContent from "../../components/custom-drawer-content";
import ForumItem from "../../components/forum-item";
// import { ThemeContext } from "../../components/theme-context";
import { ThemeContext } from "../../components/theme-context";
import { COLORS } from "../../../constants";

const DoctorForumScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "pink" ? COLORS.neutral200 : COLORS.neutral250,
        },
      ]}
    >
      <HeaderForum navigation={navigation} isDoctor={true}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 30}}>
        <ForumItem />
        <ForumItem />
        <ForumItem />
        <ForumItem />
      </ScrollView>
    </View>
  );
};

// const Drawer = createDrawerNavigator();

// const DoctorForumScreen = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default DoctorForumScreen;
