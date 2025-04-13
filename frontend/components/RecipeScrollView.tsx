import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Recipe from '@/models/Recipe';
import RecipeCard from './RecipeCard';

interface RecipeScrollViewProps {
  recipes?: Recipe[]; // Make optional just in case
}


export default function RecipeScrollView({ recipes = [] }: RecipeScrollViewProps) {
  return (
    <View style={styles.container}>
      {recipes.length > 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>No recipes available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    padding: 10,
  },
});
