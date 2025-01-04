import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { sharedData } from '@/components/SharedData';



const profile = () => {

  const userName = sharedData.username;
  const recipe_example = sharedData.savedRecipes[0];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style ={styles.inputContainer}>
          <Text style = {styles.header}>{userName}</Text>
          <Text>Favourites Recipes</Text>
          <Text>{recipe_example} </Text>
        </View>
      </View>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    marginTop: 100,
  },
  header: {
    color: '#2A2C41',
    fontSize: 25,
    fontFamily: 'Inter_500Medium'
  },
  inputContainer: {
    alignItems: 'center',
    marginLeft: 0,
    justifyContent: 'center',
  },
})