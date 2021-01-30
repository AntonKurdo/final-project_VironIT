import React, {FC, useEffect} from 'react';
import {io} from "socket.io-client";
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { THEME } from './../../theme';
import { useAppContext } from '../context/context';


const ProfileScreen: FC = () => {
  const socket = io('http://192.168.100.2:5000');
  
  useEffect((): () => void => {  
    socket.on('chat message', (msg: string) => {
      console.log(msg)
    })  
    return () => socket.off('chat message')
  }, [])
  
  return (
    <View style={styles.default}>    
      <Text>ProfileScreen</Text>   
      <TouchableOpacity style={styles.btn} onPress={() => {socket.emit('chat message', 'Hello, I am working socket!!!')}}>
        <Text style={styles.btnText}>Socket Test</Text>
      </TouchableOpacity>      
    </View>
  )
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {  
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
  }
})


export default ProfileScreen;