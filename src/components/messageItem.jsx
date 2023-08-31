import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants';

const MessageItem = ({urlImg, name, job, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={urlImg} style={{ width: 44, height: 44 }} />
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: "Regular", fontSize: SIZES.medium }}>{name}   </Text>
        <Text style={{fontSize: SIZES.medium, color: COLORS.neutral400}}>{"|"}</Text>
        <Text style={{ color: COLORS.neutral400, fontFamily: "Regular", fontSize: SIZES.xSmall, textAlignVertical: "center" }}>{"   "}{job}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginBottom: 40
   }
})

export default MessageItem;
