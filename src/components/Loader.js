/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = ({loading}) => {
  if (!loading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View>
        <ActivityIndicator color="white" size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
