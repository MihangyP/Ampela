import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { COLORS } from "../../constants";

const Button = ({ bgColor, textColor, borderRadius, onPress, children, border, icon, opacity, disable }) => {
  console.log(disable);
  return (
    <TouchableOpacity style={[styles.button, {
      backgroundColor: bgColor,
      borderWidth: border ? 1 : 0,
      borderColor: border ? COLORS.primary : "transparent",
      borderRadius: borderRadius ? borderRadius : 0,
      opacity: opacity
    }]}
      disabled={disable}
      className="rounded-full"
      onPress={onPress}
    >
      <View style={styles.flex}>
        <Text style={[styles.buttonText, {
          color: textColor,
        }]}>{children}</Text>
        {
          icon ?
            <Image source={icon} resizeMode="contain" style={styles.icon} />
            : null
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Math.floor(Dimensions.get("window").width) - 40,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: 'SBold',
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default Button;
