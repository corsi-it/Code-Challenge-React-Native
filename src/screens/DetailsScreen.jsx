import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  const todo = route.params.item;
  return (
    <View style={styles.container}>
      <Text>TODO Details</Text>
      <Text style={styles.title}>{todo.todo}</Text>
      <Text style={styles.status}>Completed: {todo.completed.toString()}</Text>

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    paddingHorizontal: 5,
  },
  title: {
    fontWeight: "bold",
    paddingVertical: 20,
  },
  status: {
    paddingVertical: 10,
  },
});

export default DetailsScreen;
