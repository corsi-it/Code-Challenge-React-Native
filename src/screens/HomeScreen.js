import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {getMoreToDoList, getToDoList, updateTodo} from "../../api/toDoList";
import {Checkbox} from "expo-checkbox";

const HomeScreen = ({ route, navigation }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    const todoList = await getToDoList()
    setTodos( todoList.todos);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos()
  },[])

  const renderItem = ({item}) =>{
    return(
      <TouchableOpacity
          style={styles.todoContainer}
          onPress={() => navigation.navigate('Details', { item: item })}
      >
        <Text style={styles.todoTitle}>{item.todo}</Text>
        <View style={styles.todoStatusContainer}>
          <Checkbox
              value={item.completed}
              onValueChange={(newValue) => updateTodo(item.id, newValue, todos).then(res=> {
                setTodos(res)
              })}
              disabled={isUpdatingTodo}
          />
        </View>
      </TouchableOpacity>
  )}

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007aff" />
        </View>
      ) : (
        <FlatList
          style={{ padding: 0}}
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={async (info) => {
            console.log(info)
            await getMoreToDoList(todos.length, 30).then((result) => setTodos([...todos, ...result]))
          }}
        />
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#89CFF0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  todoTitle: {
    color:'white',
    fontSize: 12,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  todoStatusContainer: {
    width: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoStatusLabel: {
    marginRight: 8,
    fontSize: 16,
  },
})

export default HomeScreen;
