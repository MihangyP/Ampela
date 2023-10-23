import React from 'react';
import { View, Text, Modal, StyleSheet, Linking } from 'react-native';
import {COLORS} from "../../constants";

const CustomPopup = ({ message, email, visible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={{fontFamily: "Regular"}}>{message}</Text>
          {email.includes('@') ? (
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
