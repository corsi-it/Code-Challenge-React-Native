import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import DetailedTodo from '../components/DetailedTodo'

const DetailsScreen = ({ route }) => {
  const { item } = route.params

  return (
    <View style={styles.container}>
      <DetailedTodo item={item} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DetailsScreen
