import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';

interface FilterModalProps {
  visible: boolean;
  toggleModal: () => void;
  setFilters: (filters: { [key: string]: any }) => void;
}

const FilterModal = ({ visible, toggleModal, setFilters }: FilterModalProps) => {
  const [category, setCategory] = React.useState(''); // Example filter state
  const [dietaryRestriction, setDietaryRestriction] = React.useState(''); // Example filter state
  const [isVegetarian, setIsVegetarian] = useState(false); // State to track the vegetarian checkbox
  const [sliderValue, setSliderValue] = useState(20); // Set initial slider value to 20

  const handleSliderChange = (value: number) => {
    setSliderValue(value); // Update slider value state
  };

  const handleCheckboxChange = (newValue: boolean) => {
    setIsVegetarian(newValue); // Update state when checkbox value changes
  };

  const applyFilters = () => {
    // Set the filters when the user applies them
    setFilters({
      category,
      dietaryRestriction,
      isVegetarian, // Include vegetarian filter in the applied filters
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
            placeholder="Diet"
            style={styles.input}
            value={dietaryRestriction}
            onChangeText={setDietaryRestriction}
          />

          {/* Vegetarian Checkbox */}
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Vegetarian</Text>
          </View>

          <View>
            <Text>Maximum Number of Ingredients</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={1} // Set minimum value to 1
              maximumValue={20}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#CFCFCF"
              value={sliderValue} // Bind slider value to state
              onValueChange={handleSliderChange} // Update state on slider change
              step={1} // Ensure only integer values
            />
          </View>
          <Text style={styles.sliderValueText}>{sliderValue}</Text>

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
  checkbox: {
    marginBottom: 10,
  },
  sliderValueText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
});

export default FilterModal;
