import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useQuery } from "react-query";
import { fetchTodo } from "../api-service/todos";
import { RefreshControl } from "react-native";

const HomeScreen = ({ route, navigation }) => {
  const {
    isLoading,
    data: todos,
    error,
    refetch,
  } = useQuery("myQuery", fetchTodo, { refetchOnWindowFocus: false });

  const renderTodo = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.todoListItem}
        onPress={() => navigation.navigate("Details", { item })}
      >
        <Text>{item.todo}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  console.log(todos, isLoading);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todoContainer: {
    padding: 24,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  todoListItem: {
    padding: 20,
  },
});

export default HomeScreen;
