import { Text, View, Image, StyleSheet } from 'react-native';
import React, { useState} from 'react';
import Recipe from '../models/Recipe';
import { CheckBox } from '@rneui/themed';
import { sharedData } from './SharedData';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {


  const [favourited, updateFavourited] = useState(false);

  {/* update to opposite of its previous state */ }
  const toggleCheckbox = () => {
    updateFavourited((prevFavourited) => {
      const newFavourited = !prevFavourited;
  
      // save or remove favourited relationship from the database
      if (newFavourited) {
        favouriteRecipe(recipe);
      } else {
        unfavouriteRecipe(recipe);
      }
  
      return newFavourited; 
    });
  };
  

  // save a favourited recipe relationship to db
  const favouriteRecipe = async (recipe: Recipe) => {
    const _link = recipe.getLink();
    const userName = sharedData.username;
    console.log('Sending recipe link:', _link);
    try {
      const response = await fetch('http://localhost:3000/user/favouriterecipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userName, 
          link: _link }),
      });
      const result = await response.json();
      console.log('Backend response:', result);
    } catch (error) {
      console.error('Error saving favourited recipe:', error);
    }
  }

  const unfavouriteRecipe = async (recipe:Recipe) => {
    const _link = recipe.getLink();
    const userName = sharedData.username;
    try {
      const response = await fetch('http://localhost:3000/user/unfavouriterecipe', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: userName, 
            link: _link }),
      });
      const result = await response.json();
      console.log('Backend response:', result);
    } catch (error) {
      console.error('Error saving unfavourited recipe:', error);
    }
    
  }


  const truncateList = (text:string, limit:number ) => {
    return text.length > limit ? text.slice(0,limit) + "...": text;
  };

  {/* max number of ingredients showing on the preview recipe card*/}
  const maxIngredients = 3;

  const maxChars = 35;

  return (
    <View style={styles.mainContainer}>
      {/* display recipe name */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{recipe.getName()} {favourited}</Text>

      {/* display recipe image */}
      <Image source={{ uri: recipe.getImage() }} style={{ width: 100, height: 100, marginVertical: 10 }} />

      {/* Display recipe ingredients */}
      <Text style={styles.textContainer}>Ingredients: {recipe.getNumIngredients()} </Text>
      {recipe.getIngredients().slice(0, maxIngredients).map((ingredient, index) => (
        <Text key={index} style={styles.ingredientText}>
          {truncateList(ingredient.text, maxChars)} {/* Display the ingredient name */}
        
        </Text>
      ))}
      
      {/* Optionally show a message if there are more ingredients */}
      {recipe.getIngredients().length > maxIngredients && (
        <Text style={styles.moreIngredientsText}>
          + {recipe.getIngredients().length - maxIngredients} more...
        </Text>
      )}

      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={favourited}
          checkedIcon="heart"
          uncheckedIcon="heart-o"
          checkedColor="red"
          onPress={toggleCheckbox}
          containerStyle={styles.checkbox} // Optionally style CheckBox directly
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F1F1F1",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#FFC350",
    width: 200,
    position: 'relative', // Enables child elements to use absolute positioning
    paddingBottom: 50, // Add padding at the bottom for CheckBox
  },
  textContainer: {
    fontSize: 16,
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14,
    marginBottom: 5,
  },
  moreIngredientsText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Transparent background
    borderRadius: 5,
    width: 50,
    padding: 10,
    position: 'absolute', // Absolute positioning
    bottom: 10, // Positioning from the bottom of mainContainer
    left: 10, // Positioning from the left of mainContainer
  },
  checkbox: {
    backgroundColor: 'transparent', // Make CheckBox background transparent
  },
});