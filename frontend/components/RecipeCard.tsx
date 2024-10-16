import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Recipe from '../models/Recipe';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {

  const truncateList = (text:string, limit:number ) => {
    return text.length > limit ? text.slice(0,limit) + "...": text;
  };

  {/* max number of ingredients showing on the preview recipe card*/}
  const maxIngredients = 3;

  const maxChars = 35;

  return (
    <View style={styles.mainContainer}>
      {/* display recipe name */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{recipe.getName()}</Text>

      {/* display recipe image */}
      <Image source={{ uri: recipe.getImage() }} style={{ width: 100, height: 100, marginVertical: 10 }} />

      {/* Display recipe ingredients */}
      <Text style={styles.textContainer}>Ingredients:</Text>
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
    </View>
  );
}


const styles = StyleSheet.create( {
  mainContainer: {
    backgroundColor: "#F1F1F1",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth:3,
    borderColor: "#FFC350",
    width: 200,
    
  },
  textContainer: {
    fontSize: 16, 
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14, // Optional: Adjust font size for ingredients
    marginBottom: 5,
  },
  moreIngredientsText: {
    fontSize: 14,
    color: '#888', // Optional: Style for the "more ingredients" text
    marginTop: 5,
  },

});