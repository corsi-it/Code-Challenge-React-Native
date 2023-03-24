import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Animated,
  TouchableNativeFeedback
} from "react-native";
import {deleteTodo, getTodos, updateTodo} from "../network/api";
import {Checkbox} from "expo-checkbox";
import Swipeable from 'react-native-gesture-handler/Swipeable';

const HomeScreen = ({ route, navigation }) => {

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [updatingIndex, setUpdatingIndex] = useState()

  useEffect(() => {
    setIsLoading(true)
    loadData()
        .catch(e => {
          alert(e.toString())
        })
        .finally(() => {
          setIsLoading(false)
        })
  }, [])

  const loadData = async (forceReload = false) => {
    let newTodos = await getTodos( forceReload ? 0 : todos.length)

    if (forceReload)
      setTodos(newTodos)
    else
      setTodos([...todos, ...newTodos])
  }

  const toggleCompleted = async (todoID, completed, index) => {
    setUpdatingIndex(index)
    let data = await updateTodo(todoID, completed)
    let tempTodos = [...todos]
    tempTodos[index] = data
    setTodos(tempTodos)
    setUpdatingIndex(null)
  }

  const renderItem = ({item, index}) => {

    const deleteItem = () => {
      deleteTodo(item.id)
          .then(() => {
            let tempTodos = [...todos]
            tempTodos.splice(index, 1)
            setTodos(tempTodos)
          })
    }
    const swipeRight = (progress,dragX) => {
      const scale = dragX.interpolate({
        inputRange:[-60,0],
        outputRange:[1,0.2],
        extrapolate:'clamp'
      })
      return(
            <TouchableNativeFeedback
                onPress={deleteItem}>
              <Animated.View style={{backgroundColor: "#ff0000", width:"20%", alignItems:'center', justifyContent:'center', transform:[{scale}]}}>
                <Text>delete</Text>
              </Animated.View>
            </TouchableNativeFeedback>
      )
    }

    return (
        <Swipeable renderRightActions={swipeRight} rightThreshold={-200}>
          <TouchableOpacity
            onPress={(e) => {
              navigation.navigate('Details', {todo: item})
            }}
            key={item.id}
            >
            <Animated.View style={styles.listItem}>
              {updatingIndex !== index ? (
                  <Checkbox
                    style={styles.itemCheckbox}
                    value={item.completed}
                    onValueChange={(checked) => {
                      toggleCompleted(item.id, checked, index)
                    }}
                    color={item.completed ? '#007700' : undefined}></Checkbox>

                  ) : (
                    <ActivityIndicator style={styles.itemCheckbox} size={"small"}></ActivityIndicator>
                  )}
              <Text style={[styles.itemText, item.completed ? styles.completedItem : {}]}>{item.todo}</Text>
            </Animated.View>
          </TouchableOpacity>
        </Swipeable>
    )
  }


  return (
    <View style={styles.container}>
      <Button
          title={'Add a ToDo'}
          onPress={(_) => {
            navigation.navigate('New')
          }}></Button>
      {isLoading ? (
          <ActivityIndicator size={'large'} style={styles.loadingView}></ActivityIndicator>
      ) : (
          <FlatList
              style={styles.list}
              data={todos}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              refreshing={isRefreshing}
              onRefresh={(_) => {
                setIsRefreshing(true)
                loadData(true)
                    .catch(e => {
                      alert(e.toString())
                    })
                    .finally(() => {
                      setIsRefreshing(false)
                    })
              }}
              onEndReachedThreshold={0.5} //a metà pagina inizia a caricare gli altri dati
              onEndReached={(_) => {
                loadData()
              }}
          ></FlatList>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  list: {
    padding:20,
    marginBottom: 30,
    width: "100%"
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#e0e0e0",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    columnGap: 10,
    flexWrap: "nowrap"
  },
  itemCheckbox: {
    height: 30,
    width: 30
  },
  itemText: {
    color: '#000',
    fontSize: 18,
    flexShrink: 1,
    lineHeight: 30
  },
  completedItem: {
    textDecorationLine: "line-through"
  }
});

export default HomeScreen;
