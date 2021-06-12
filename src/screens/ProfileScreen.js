/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Input from '../components/Input';
import MyButton from '../components/MyButton';
import Headings from '../components/Headings';
import {AuthContext} from '../contexts/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen = ({navigation}) => {
  const {
    auth: {logout, updateUser},
    user,
  } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState(user?.nom);
  const [prenom, setPrenom] = useState(user?.prenom);
  const [civilite, setCivilite] = useState(user?.civilite);
  const [ville, setVille] = useState(user?.ville);
  const [adresse, setAdresse] = useState(user?.adresse);
  const [image, setimage] = useState(user?.photo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openPicker = () => {
    const options = {includeBase64: true};
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        return;
      } else {
        setimage(res.assets[0].uri);
        console.log(res);
      }
    });
  };
  console.log(user);
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Headings style={styles.text}>PROFIL</Headings>
        <Image
          source={{
            uri: !image
              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png'
              : image,
          }}
          style={styles.img}
        />

        <MyButton
          title={'Choisir Image'}
          style={styles.fileBtn}
          onPress={openPicker}
        />
        {error.name ? <ErrorMessage errorMessage={error.name[0]} /> : null}
        {error.prenom ? <ErrorMessage errorMessage={error.prenom[0]} /> : null}
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
          />
          <Input
            style={styles.input}
            placeholder="Prenom"
            value={prenom}
            onChangeText={setPrenom}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="Civilité"
            value={civilite}
            onChangeText={setCivilite}
          />
          <Input
            style={styles.input}
            placeholder="Adresse"
            value={adresse}
            onChangeText={setAdresse}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="Ville"
            value={ville}
            onChangeText={setVille}
          />
          <Input
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {error.email ? <ErrorMessage errorMessage={error.email[0]} /> : null}
        <Input
          style={styles.inputBot}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.btnLayout}>
          <MyButton
            title={'Logout'}
            style={styles.logoutbtn}
            onPress={logout}
          />
          <MyButton
            title={'Modify'}
            style={styles.Modifybtn}
            onPress={async () => {
              try {
                setLoading(true);
                await updateUser(
                  user?.token,
                  user?.id,
                  email,
                  password,
                  nom,
                  prenom,
                  civilite,
                  adresse,
                  ville,
                  image,
                );
                setLoading(false);
              } catch (err) {
                setError(err.response.data.errors);
                setLoading(false);
              }
            }}
          />
        </View>
      </View>
      <Loader loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  text: {
    marginVertical: 8,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginVertical: 8,
  },
  fileBtn: {
    backgroundColor: '#62a1f9',
    width: 200,
    borderRadius: 8,
  },
  btnLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutbtn: {
    backgroundColor: '#DA3D3D',
    width: '40%',
    borderRadius: 8,
    marginRight: 8,
  },
  Modifybtn: {
    backgroundColor: '#62a1f9',
    width: '40%',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '50%',
    marginVertical: 8,
    marginHorizontal: 4,
  },
  inputBot: {
    marginVertical: 8,
    width: '100%',
  },
});

export default ProfileScreen;
