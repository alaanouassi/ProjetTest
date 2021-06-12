/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Headings from '../components/Headings';
import Input from '../components/Input';
import MyButton from '../components/MyButton';
import RegisterText from '../components/RegisterText';
import ErrorMessage from '../components/ErrorMessage';
import {AuthContext} from '../contexts/AuthContext';
import Loader from '../components/Loader';

const LoginScreen = ({navigation}) => {
  const {
    auth: {login},
  } = useContext(AuthContext);
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return (
    <View style={styles.container}>
      <Headings style={styles.title}>S'identifier</Headings>
      {error ? <ErrorMessage errorMessage={error} /> : null}

      <Input
        style={styles.input}
        placeholder="Enter Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder="Enter Your Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <MyButton
        title="login"
        style={styles.loginBtn}
        onPress={async () => {
          try {
            setLoading(true);
            await login(email, password);
          } catch (err) {
            if (!err.response.data.errors) {
              setError(err.response.data.message);
            } else {
              setError('Veuillez Entrez tout les informations!');
            }
            console.log(err.response.data.errors);
            console.log(err.response.data.message);
            // setError(err.message);
            setLoading(false);
          }
        }}
      />
      <RegisterText
        title="Don't have an Account,register!"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
      <Loader loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
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

export default LoginScreen;
