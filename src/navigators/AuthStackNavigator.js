/* eslint-disable prettier/prettier */
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
