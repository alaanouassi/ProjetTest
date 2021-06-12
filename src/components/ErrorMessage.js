/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ErrorMessage = ({errorMessage}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ErrorMessage;
