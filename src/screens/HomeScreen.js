import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar, Pressable} from 'react-native';

const HomeScreen = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    //console.log(data['todos']);

    useEffect(() => {
        fetch('https://dummyjson.com/todos?limit=3&skip=10')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    const goToItem = (item) => {
        navigation.navigate('Details', {
            item: item
        })
    }

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={data['todos']}
                keyExtractor={({id}, index) => id}
                renderItem={({item}) => (
                    <Pressable onPress={() => goToItem(item)}>
                        <Text style={styles.item}>{item.id + '. ' + item.todo}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 10,
    },
    item: {
        backgroundColor: '#CBE8ED',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
    }
})

export default HomeScreen;
