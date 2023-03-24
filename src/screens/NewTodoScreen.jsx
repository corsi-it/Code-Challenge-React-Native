import React, {useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {addTodo} from "../network/api";

const NewTodoScreen = ({ route , navigation }) => {

    const [todoText, setTodoText] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const saveTodo = () => {
        setIsSaving(true)
        addTodo(2, todoText)
            .then(data => {
                alert('Your ToDo has been added successfully. ID:'+data.id)
                navigation.goBack()
            })
            .catch(e => {
                alert(e.toString())
            })
            .finally(() => {
                setIsSaving(false)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 24}}>Add a new ToDo</Text>
            <TextInput
                multiline={true}
                style={styles.textArea}
                placeholder={"Write your ToDo here"}
                onChangeText={text => {setTodoText(text)}}
            ></TextInput>
            {isSaving ? (
                <ActivityIndicator style={styles.itemCheckbox} size={"small"}></ActivityIndicator>
            ) : (
                <Button
                    disabled={todoText.length<1}
                    title={'Save and close'}
                    onPress={saveTodo}
                ></Button>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 30
    },
    textArea: {
        width: "80%",
        marginVertical: 20,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 2,
        padding: 10,
        maxHeight: 250
    }
})

export default NewTodoScreen;
