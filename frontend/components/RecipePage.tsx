import { Text, View, Image, StyleSheet } from 'react-native';
import React, { useState} from 'react';
import Recipe from '../models/Recipe';
import { CheckBox } from '@rneui/themed';

export default function RecipePage({ recipe }: { recipe: Recipe }) {
    <View style={styles.mainContainer}>
        <Text style={styles.title}>
            {recipe.getName()}
        </Text>

    </View>

};

const styles = StyleSheet.create({
    mainContainer: {
        width: 200,
        height:400,
    },
    title: {
        fontSize: 30,
    }
})