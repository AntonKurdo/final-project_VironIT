import React, {FC, useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { THEME } from './../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import httpService from '../services/http.service';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen: FC = () => {

  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  if(loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'#fff'} />
      </View>    
    )
  };

  return (
    <View style={styles.container}>  
      <TextInput          
        placeholderTextColor={'#fff'}
        placeholder='E-mail'
        style={{...styles.input, marginBottom: 30}}
        value={email}
        onChangeText={em => setEmail(em.trim())}
      />  
      <View>
        <TouchableOpacity style={styles.icon} onPress={() => setSecure(!secure)}>
           {
           secure 
           ? <MaterialIcons  name="visibility-off" size={28} color={'#fff'} />
           : <MaterialIcons name="visibility" size={28} color={'#fff'} />}
        </TouchableOpacity>       
        <TextInput         
          placeholderTextColor={'#fff'}        
          secureTextEntry={secure}
          placeholder='Password'
          style={styles.input}
          value={password}
          onChangeText={pass => setPassword(pass.trim())}
        />
      </View>  
      <TouchableOpacity style={styles.btn} onPress={async () => {
        setLoading(true);
        const result = await httpService.signUp({email, password})
        setEmail('');
        setPassword('');
        setLoading(false);
        if(result) {
          navigation.navigate('Login');
        }
      }}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>   

      <TouchableOpacity style={styles.underBtn} activeOpacity={.9} onPress={() => navigation.navigate('Login')}>
         <Text style={styles.underText}>I am already a member</Text>
      </TouchableOpacity>     
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: 'center',
    backgroundColor: THEME.MAIN_COLOR
  },
  titleText: {
    color: '#fff',
    fontSize: 30,
    position: 'absolute',
    top: 100,
    left: 30,    
    fontWeight: 'bold'
  },
  input: {
    alignSelf: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: THEME.INPUT_WIDTH,
    fontSize: 18,
    padding: 7,
    color: '#fff'
  },
  icon: {
    width: 30,
    position: 'absolute',
    right: 45,
    bottom: 5,
    zIndex: 2
  },
  btn: {  
    marginTop: 50,
    alignSelf: 'center',
    width: THEME.BTN_WIDTH,
    height: THEME.BTN_HEIGHT,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  btnText: {
    fontSize: 20,
    color: THEME.MAIN_COLOR
  },
  underBtn: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center'    
  },
  underText: {
    fontSize: 16,  
    fontStyle: 'italic',
    color: 'lightgray',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",    
  }
})


export default SignUpScreen;