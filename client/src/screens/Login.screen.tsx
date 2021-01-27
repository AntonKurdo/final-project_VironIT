import React, {FC, useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { THEME } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import httpService from '../services/http.service';
import { useNavigation } from '@react-navigation/native';



const LoginScreen: FC = () => {

  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  if(loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
      </View>    
    )
  };
  
  return (
    <View style={styles.container}>        
      <TextInput          
        placeholderTextColor={THEME.MAIN_COLOR}
        placeholder='E-mail'
        style={{...styles.input, marginBottom: 30}}
        value={email}
        onChangeText={em => setEmail(em.trim())}
      />  
      <View>
        <TouchableOpacity style={styles.icon} onPress={() => setSecure(!secure)}>
           {
           secure 
           ? <MaterialIcons  name="visibility-off" size={28} color={THEME.MAIN_COLOR} />
           : <MaterialIcons name="visibility" size={28} color={THEME.MAIN_COLOR} />}
        </TouchableOpacity>       
        <TextInput         
          placeholderTextColor={THEME.MAIN_COLOR}        
          secureTextEntry={secure}
          placeholder='Password'
          style={styles.input}
          value={password}
          onChangeText={pass => setPassword(pass.trim())}
        />
      </View>  
      <TouchableOpacity style={styles.btn} onPress={async () => {
        setLoading(true);
        const result = await httpService.logIn({email, password})
        setEmail('');
        setPassword('');
        setLoading(false);
        if(result) {
          navigation.navigate('Profile');
        }
      }}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.underBtn} activeOpacity={.9}>
        <Text style={styles.underText} > New here? <Text onPress={() => navigation.navigate('Sign Up')} style={{...styles.underText, textDecorationLine: "underline", textDecorationStyle: "solid"}}>Sign Up instead</Text> </Text>         
      </TouchableOpacity>      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titleText: {
    color: THEME.MAIN_COLOR,
    fontSize: 30,
    position: 'absolute',
    top: 100,
    left: 30,    
    fontWeight: 'bold'
  },
  input: {
    alignSelf: 'center',
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: THEME.INPUT_WIDTH,
    fontSize: 18,
    padding: 7,
    color: THEME.MAIN_COLOR
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
    backgroundColor: THEME.MAIN_COLOR
  },
  btnText: {
    fontSize: 20,
    color: '#fff'
  },
  underBtn: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center'    
  },
  underText: {
    fontSize: 16,  
    fontStyle: 'italic',
    color: THEME.MAIN_COLOR,
    
  }
})


export default LoginScreen;