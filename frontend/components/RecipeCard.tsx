import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Recipe from '../models/Recipe';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <View style={styles.mainContainer}>
      {/* display recipe name */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{recipe.getName()}</Text>

      {/* display recipe image */}
      <Image source={{ uri: recipe.getImage() }} style={{ width: 100, height: 100, marginVertical: 10 }} />

      {/* display recipe ingredients */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Ingredients:</Text>
      {recipe.getIngredients().map((ingredient, index) => (
        <Text key={index}>
          {ingredient.text}  {/* Display only the ingredient name */}
        </Text>
      ))}
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
    borderColor: "#FFC350"
  },

});