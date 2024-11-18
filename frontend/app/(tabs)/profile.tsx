import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { sharedData } from '@/components/SharedData';



const profile = () => {

  const userName = sharedData.username;

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>hi{userName}</Text>
      </View>
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