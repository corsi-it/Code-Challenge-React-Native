import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const DetailedTodo = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>Todo</Text> #{item.id}: {item.todo}
      </Text>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>Completed</Text>:
        {item.completed ? ' YES' : ' NO'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 14,
    margin: 10,
    backgroundColor: 'lightblue',
  },
})

export default DetailedTodo
