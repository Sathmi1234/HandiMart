import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type AddOptionsModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddProduct: () => void;
  onAddPost: () => void;
};

const AddOptionsModal: React.FC<AddOptionsModalProps> = ({ visible, onClose, onAddProduct, onAddPost }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              onClose();
              onAddProduct();
            }}
          >
            <View style={styles.optionContent}>
              <Feather name="package" size={24} color="#E24C4C" />
              <Text style={styles.optionText}>Add Product</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              onClose();
              onAddPost();
            }}
          >
            <View style={styles.optionContent}>
              <Feather name="edit-3" size={24} color="#E24C4C" />
              <Text style={styles.optionText}>Add Post</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
    color: '#333',
  },
});

export default AddOptionsModal;