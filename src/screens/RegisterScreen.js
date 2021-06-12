/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Headings from '../components/Headings';
import Input from '../components/Input';
import MyButton from '../components/MyButton';
import ErrorMessage from '../components/ErrorMessage';
import {AuthContext} from '../contexts/AuthContext';
import Loader from '../components/Loader';

const RegisterScreen = ({navigation}) => {
  const {
    auth: {register},
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [prenom, setprenom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Headings style={styles.title}>S'inscrire</Headings>
        {error.name ? <ErrorMessage errorMessage={error.name[0]} /> : null}
        <Input
          style={styles.input}
          placeholder="Entrez Votre Nom"
          value={name}
          onChangeText={setname}
        />
        {error.prenom ? <ErrorMessage errorMessage={error.prenom[0]} /> : null}
        <Input
          style={styles.input}
          placeholder="Entrez Votre prenom"
          value={prenom}
          onChangeText={setprenom}
        />
        {error.email ? <ErrorMessage errorMessage={error.email[0]} /> : null}
        <Input
          style={styles.input}
          placeholder="Entez Votre Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {error.password ? (
          <ErrorMessage errorMessage={error.password[0]} />
        ) : null}
        <Input
          style={styles.input}
          placeholder="Entez votre mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <MyButton
          title="register"
          style={styles.loginBtn}
          onPress={async () => {
            try {
              setLoading(true);
              await register(email, password, name, prenom);
              navigation.pop();
            } catch (err) {
              setError(err.response.data.errors);
              setLoading(false);
            }
          }}
        />
      </View>
      <Loader loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
  },
  loginBtn: {
    marginVertical: 32,
  },
});

export default RegisterScreen;
