import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = ({ route: {params: {todo}}, navigation }) => {
  return (
    <View style={[styles.container, {backgroundColor: todo.completed ? "#ccFFcc" : "#fff"}]}>
      <Text
        style={styles.id}
      >- {todo.id} -</Text>
      <Text style={styles.todo}>{todo.todo}</Text>
      <Text style={styles.userInfo}>From User {todo.userId}</Text>
      <Text style={[styles.completionInfo, {backgroundColor: todo.completed ? "#006600" : "#a8a8a8"}]}>
        {todo.completed ? 'COMPLETED' : 'UNCOMPLETED'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    rowGap: 20,
    padding:10
  },
  id: {
    fontSize: 24
  },
  todo: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold"
  },
  userInfo: {
    fontStyle: "italic"
  },
  completionInfo: {
    fontSize: 24,
    color: "#fff",
    padding: 10
  }
})

export default DetailsScreen;
