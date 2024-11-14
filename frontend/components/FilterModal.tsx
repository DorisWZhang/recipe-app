import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { CheckBox } from 'react-native-elements';

interface FilterModalProps {
  visible: boolean;
  toggleModal: () => void;
  setFilters: (filters: { [key: string]: any }) => void;
}

const FilterModal = ({ visible, toggleModal, setFilters }: FilterModalProps) => {
  const [category, setCategory] = React.useState(''); // Example filter state
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    vegetarian: false,
    vegan: false,
    paleo: false,
    highProtein: false,
    lowFat: false,
    lowSodium: false,
    lowSugar: false,
  });

  // Allergy filters grouped as an object
  const [allergies, setAllergies] = useState({
    gluten: false,
    fish: false,
    dairy: false,
    eggs: false,
    shellfish: false,
    treeNuts: false,
    peanuts: false,
    soy: false,
    wheat: false,
  });

  const [sliderValue, setSliderValue] = useState(25); // Set initial slider value to 25

  const handleSliderChange = (value: number) => {
    setSliderValue(value); // Update slider value state
  };

  const handleDietaryChange = (dietary: string) => {
    setDietaryRestrictions((prev) => ({
      ...prev,
      [dietary]: !prev[dietary], // Toggle specific dietary restriction
    }));
  };

  const handleAllergyChange = (allergy: string) => {
    setAllergies((prev) => ({
      ...prev,
      [allergy]: !prev[allergy], // Toggle specific allergy
    }));
  };

  const applyFilters = () => {
    // Set the filters when the user applies them
    setFilters({
      category,
      dietaryRestrictions, // Include dietary restrictions filter in the applied filters
      allergies, // Include allergy filter in the applied filters
      maxIngredients: sliderValue,
    });
    //toggleModal(); // Close the modal after applying filters
  };

  const renderCheckboxes = (filters: { [key: string]: boolean }, onPress: (key: string) => void) => {
    return Object.keys(filters).map((key, index) => {
      return (
        <View style={[styles.checkboxWrapper, index % 2 !== 0 && styles.secondCheckbox]}>
          <CheckBox
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            checked={filters[key]}
            onPress={() => onPress(key)}
          />
        </View>
      );
    });
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
          <Text style={styles.modalText}>Filters</Text>

          <View>
            <Text>Allergies</Text>
            {/* Allergy checkboxes */}
            <View style={styles.checkboxContainer}>
              {renderCheckboxes(allergies, handleAllergyChange)}
            </View>
          </View>

          <View>
            <Text>Diet</Text>
            {/* Dietary restriction checkboxes */}
            <View style={styles.checkboxContainer}>
              {renderCheckboxes(dietaryRestrictions, handleDietaryChange)}
            </View>
          </View>

          <View>
            <Text>Number of Ingredients (up to)</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={1} // Set minimum value to 1
              maximumValue={25}
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
    width: 400,
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
  checkboxWrapper: {
    width: '45%', // Set each checkbox container to take up about half the row
    marginBottom: 10,
  },
  secondCheckbox: {
    marginLeft: '10%', // Space the second checkbox from the first on the same row
  },
  sliderValueText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping for checkboxes to go to next row
    justifyContent: 'space-between', // Space checkboxes evenly
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
