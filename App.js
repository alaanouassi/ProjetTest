/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import {AuthContext} from './src/contexts/AuthContext';
import axios from 'axios';
import {BASE_URL} from './src/config/index';
import ProfileStackNavigator from './src/navigators/ProfileStackNavigator';
import SecureStorage from 'react-native-secure-storage';

const RootStack = createStackNavigator();
const App = () => {
  const [Authstate, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.user},
          };
        case 'LOGOUT_USER':
          return {
            ...state,
            user: undefined,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
    },
  );
  const auth = useMemo(
    () => ({
      login: async (email, password) => {
        const {data} = await axios.post(`${BASE_URL}api/login`, {
          email: email,
          password: password,
        });
        const user = {
          id: data.user.id,
          email: data.user.email,
          nom: data.user.name,
          prenom: data.user.prenom,
          civilite: data.user.civilite,
          adresse: data.user.adresse,
          ville: data.user.adresse,
          photo: data.user.photo,
          token: data.token,
        };
        await SecureStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      },
      logout: async () => {
        await SecureStorage.removeItem('user');
        dispatch({
          type: 'LOGOUT_USER',
        });
      },
      register: async (email, password, name, prenom) => {
        await axios.post(`${BASE_URL}api/register`, {
          name: name,
          prenom: prenom,
          email: email,
          password: password,
        });
      },
      updateUser: async (
        token,
        id,
        email,
        password,
        name,
        prenom,
        civilite,
        adresse,
        ville,
        photo,
      ) => {
        const {
          config: {data},
        } = await axios.put(
          `${BASE_URL}api/update/${id}`,
          {
            name: name,
            prenom: prenom,
            email: email,
            password: password,
            civilite: civilite,
            adresse: adresse,
            ville: ville,
            photo: photo,
          },
          {headers: {Authorization: `Bearer ${token}`}},
        );
        const userData = JSON.parse(data);
        const user = {
          id: id,
          nom: userData.name,
          email: userData.email,
          prenom: userData.prenom,
          civilite: userData.civilite,
          adresse: userData.adresse,
          ville: userData.adresse,
          photo: userData.photo,
          token: token,
        };
        await SecureStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      },
    }),
    [],
  );
  useEffect(async () => {
    await SecureStorage.getItem('user').then(user => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          user: JSON.parse(user),
        });
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{auth, user: Authstate.user}}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {Authstate.user ? (
            <RootStack.Screen
              name="ProfileStack"
              component={ProfileStackNavigator}
            />
          ) : (
            <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
