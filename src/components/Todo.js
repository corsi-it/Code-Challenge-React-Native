import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Todo = ({ item, navigation, onDelete }) => {
  return (
    <GestureHandlerRootView>
      <Swipeable
        onSwipeableOpen={() => onDelete(item.id)}
        renderRightActions={() => (
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <Text>Deleting todo...</Text>
          </View>
        )}
      >
        <Pressable
          onPress={() => {
            navigation.navigate('Details', {
              item: item,
            })
          }}
        >
          <View style={styles.container}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Todo</Text> #{item.id}:
              {item.todo}
            </Text>
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
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

export default Todo
