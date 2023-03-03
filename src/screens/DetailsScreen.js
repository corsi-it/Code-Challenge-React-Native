import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  const {item} = route.params;
  console.log(item)
  return (
    <View style={styles.container}>

      <Text style={{
        backgroundColor: item?.completed ? 'green' :'red',
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
        borderRadius:8,
      }}>{item?.completed ? 'Completed' : 'Not Completed' } </Text>
      <Text style={styles.titleStyle}>{item?.todo}</Text>
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
  titleStyle:{
    padding:16,
    fontSize: 24,
    fontWeightBold: 'bold',
    backgroundColor: '#89CFF0',
    borderRadius:8,
    textAlign: 'center'
  }

})

export default DetailsScreen;
