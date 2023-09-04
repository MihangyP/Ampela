import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const MessageItem = ({ urlImg, name, job, lastMessage, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={urlImg}
        style={{ width: 44, height: 44, borderRadius: 100 }}
      />
      <View style={{ marginLeft: 15 }}>
        <View style={{display:"flex",flexDirection:"row"}}>
          <Text style={{ fontFamily: "Regular", fontSize: SIZES.medium }}>
            {name}
          </Text>
          <Text style={{ fontSize: SIZES.medium, color: COLORS.neutral400 }}>
            {" | "}
          </Text>
          <Text
            style={{
              color: COLORS.neutral400,
              fontFamily: "Regular",
              fontSize: SIZES.xSmall,
              textAlignVertical: "center",
            }}
          >
            {job}
          </Text>
        </View>
        <View>
          {lastMessage && (
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: SIZES.small,
                color: COLORS.neutral400,
                marginTop: 5,
              }}
              numberOfLines={1}
            >
              {lastMessage}
              {/* {lastMessage.length > 20
                ? lastMessage.substring(0, 20) + "..."
                : lastMessage} */}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 40,
    marginLeft: 15,
  },
});

export default MessageItem;
