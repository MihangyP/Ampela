import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Linking } from 'react-native';
import { COLORS } from "../../constants";
import { TouchableOpacity } from 'react-native';


const CustomPopup = ({ message, email, error, visible, onClose }) => {
  // const [visible, setVisible] = useState(isVisible);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      
    >
      <View style={styles.modalContainer}>
        <View className="bg-white p-2 py-5 rounded-md text-center w-[80%] min-h-[180px] flex items-center flex-col justify-center">
          <TouchableOpacity className="absolute top-0 right-0 m-3 mr-5" onPress={() => { visible=false }}>
            <Text className=" text-2xl">X</Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: "Regular" }} className="text-center">{message}</Text>
          {email && email.includes('@') && email != "" ? (
            <Text
              style={styles.link}
              onPress={() => {
                Linking.openURL(`mailto:${email}`);
                onClose();
              }}
            >
              Vérifiez votre e-mail ici
            </Text>
          ) : (
            <Text>{email}</Text>
          )}

          {/* <Text></Text> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5
  },
  link: {
    fontFamily: "Regular",
    color: COLORS.accent600,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default CustomPopup;
