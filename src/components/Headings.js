/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Headings = ({children, style, ...props}) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: '#000',
  },
});

export default Headings;
