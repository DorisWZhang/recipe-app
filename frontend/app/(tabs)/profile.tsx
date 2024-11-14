import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { sharedData } from '@/components/SharedData';



const profile = () => {

  const userName = sharedData.username;

  return (
    <View style={styles.mainContainer}>
      <Text>hi{userName}</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    }
})