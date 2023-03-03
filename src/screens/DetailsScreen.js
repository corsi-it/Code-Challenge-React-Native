import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>TODO Details</Text>
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
})

export default DetailsScreen;
