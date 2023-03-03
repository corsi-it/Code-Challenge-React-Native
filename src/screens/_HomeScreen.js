import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import RootStackParamList from '../types/RootStackParamList';

const HomeScreen = ({userId}) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState(null);

  const navigation = useNavigation();

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/todos?page=${page}`);
      const data = await response.json();
      setTodos([...todos, ...data.todos]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleAddTodo = async () => {
    setIsAddingTodo(true);
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodoTitle,
        }),
      });
      const data = await response.json();
      setTodos([data, ...todos]);
      setNewTodoTitle('');
    } catch (error) {
      console.error(error);
    }
    setIsAddingTodo(false);
  };

  const handleUpdateTodo = async (id, completed) => {
    setIsUpdatingTodo(true);
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed,
        }),
      });
      const data = await response.json();
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return data;
        } else {
          return todo;
        }
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
    setIsUpdatingTodo(false);
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        const remainingTodos = todos.filter((todo) => todo.id !== id);
        setTodos(remainingTodos);
      } else {
        Alert.alert('Failed to delete todo');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to delete todo');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoContainer}
      onPress={() => navigation.navigate(RootStackParamList.Details, { todo: item })}
    >
      <Text style={styles.todoTitle}>{item.title}</Text>
      <View style={styles.todoStatusContainer}>
        <Text style={styles.todoStatusLabel}>{item.completed ? 'Completed' : 'Pending'}</Text>
        <CheckBox
          value={item.completed}
          onValueChange={(newValue) => handleUpdateTodo(item.id, newValue)}
          disabled={isUpdatingTodo}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007aff" />
        </View>
      ) : (
        <>
          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTodo}
          >
            <Text style={styles.addButtonText}>New Todo</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoStatusLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007aff',
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});