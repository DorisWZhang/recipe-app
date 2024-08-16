import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Profile</Text>
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