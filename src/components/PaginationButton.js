import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'

const PaginationButton = ({ buttonText, onPress, disabled }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View style={styles.container}>
        <Text style={disabled ? { color: 'grey' } : { color: 'black' }}>
          {buttonText}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 14,
    margin: 10,
    backgroundColor: '#ccc',
  },
})

export default PaginationButton
