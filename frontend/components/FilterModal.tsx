import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

interface FilterModalProps {
  visible: boolean;
  toggleModal: () => void;
  setFilters: (filters: { [key: string]: any }) => void;
}

const FilterModal = ({ visible, toggleModal, setFilters }: FilterModalProps) => {
  const [category, setCategory] = React.useState(''); // Example filter state
  const [dietaryRestriction, setDietaryRestriction] = React.useState(''); // Example filter state

  const applyFilters = () => {
    // Set the filters when the user applies them
    setFilters({
      category,
      dietaryRestriction,
    });
    toggleModal(); // Close the modal after applying filters
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Filter Options</Text>

          {/* Example filter inputs */}
          <TextInput
            placeholder="Category"
            style={styles.input}
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            placeholder="Dietary Restriction"
            style={styles.input}
            value={dietaryRestriction}
            onChangeText={setDietaryRestriction}
          />
          <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#CFCFCF"
                        maximumTrackTintColor="#000000"
                    />

          <TouchableOpacity onPress={applyFilters}>
            <Text style={styles.applyButton}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  applyButton: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
  },
  closeButton: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
});

export default FilterModal;
