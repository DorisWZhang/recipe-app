import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Recipe from '@/models/Recipe';
import RecipeCard from './RecipeCard';

interface RecipeScrollViewProps {
    recipes: Recipe[]
}


export default function RecipeScrollView({recipes}: RecipeScrollViewProps ) {
    return (
        <View>
            <ScrollView horizontal={true}>
                {recipes.length > 0 ? (
                    recipes.map((recipe: Recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                    ))) : 
                    (<Text
                        style={{fontSize:16}}>
                        No recipes available</Text>)
                }
            </ScrollView>
        </View>
    )
}

