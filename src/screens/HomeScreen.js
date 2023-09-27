import React from 'react'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'

import Todo from '../components/Todo'
import useFetchTodos from '../hooks/useFetchTodos'
import PaginationButton from '../components/PaginationButton'

// May be adjusted to fit screen dimensions. Should be a positive integer.
const itemsPerPage = 6

const HomeScreen = ({ navigation }) => {
  const {
    todos,
    loading,
    error,
    refreshing,
    setRefreshing,
    setTodos,
    setSkip,
    totalPages,
    page,
    totalTodos,
  } = useFetchTodos(itemsPerPage)

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch('https://dummyjson.com/todos/' + todoId, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      if (data.isDeleted) {
        setTodos((previousTodos) =>
          previousTodos.filter((todo) => todo.id != todoId)
        )
      }
    } catch (err) {
      Alert.alert('Unable to delete todo')
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading data...</Text>
      ) : error ? (
        <Text>Error loading data!</Text>
      ) : (
        <>
          <FlatList
            refreshing={refreshing}
            onRefresh={() => setRefreshing(() => true)}
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <Todo
                item={itemData.item}
                navigation={navigation}
                onDelete={handleDeleteTodo}
              />
            )}
          />
          <View style={{ flexDirection: 'row' }}>
            <PaginationButton
              onPress={() => setSkip(() => 0)}
              buttonText="First"
              disabled={page === 1}
            />
            <PaginationButton
              onPress={() =>
                setSkip(
                  (currentSkippedItems) => currentSkippedItems - itemsPerPage
                )
              }
              buttonText="Previous"
              disabled={page === 1}
            />
            <PaginationButton
              onPress={() =>
                setSkip(
                  (currentSkippedItems) => currentSkippedItems + itemsPerPage
                )
              }
              buttonText="Next"
              disabled={page === totalPages}
            />
            <PaginationButton
              onPress={() => setSkip(() => totalTodos - itemsPerPage)}
              buttonText="Last"
              disabled={page === totalPages}
            />
          </View>
          <Text
            style={{
              padding: 14,
              margin: 10,
            }}
          >
            Page {page} of {totalPages}
          </Text>
        </>
      )}
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

export default HomeScreen
