import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailsScreen = ({route, navigation}) => {
    const {item} = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TODO Details</Text>
            <View style={styles.content}>
                <View>
                    <Text style={styles.text}>itemId</Text>
                    <Text style={styles.text}>Thing todo: </Text>
                    <Text style={styles.text}>has been done:</Text>
                </View>
                <View>
                    <Text style={styles.text}>{item.id}</Text>
                    <Text style={styles.text}>{item.todo}</Text>
                    <Text style={styles.text}>{item.completed ? 'YES' : 'NO'}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 15,
    },
    content: {
        flex: 1,
        flexDirection: "row",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 10,
    },
    text: {
        marginVertical: 5,
    },
})

export default DetailsScreen;
