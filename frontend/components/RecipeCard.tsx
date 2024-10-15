import { Text, View, Image } from 'react-native';
import React from 'react';
import Recipe from '../models/Recipe';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <View style={{ padding: 10 }}>
      {/* Display Recipe Name */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{recipe.getName()}</Text>

      {/* Display Recipe Image */}
      <Image source={{ uri: recipe.getImage() }} style={{ width: 100, height: 100, marginVertical: 10 }} />

      {/* Display Recipe Ingredients */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Ingredients:</Text>
      {recipe.getIngredients().map((ingredient, index) => (
        <Text key={index}>
          {ingredient.text}  {/* Display only the ingredient name */}
        </Text>
      ))}
    </View>
  );
}
