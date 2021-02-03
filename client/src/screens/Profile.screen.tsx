import React, {FC, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { THEME } from './../../theme';
import { useAppContext } from '../context/context';

const ProfileScreen: FC = () => {
  const {activeUserInfo}  = useAppContext(); 
  return (
    <View style={styles.default}>    
      <Text style={styles.greetingText}>Hi, {activeUserInfo.firstName}!</Text>   
      {
        activeUserInfo.avatar !== '' && <Image source={{uri: activeUserInfo.avatar}}  style={{width: 150, height: 150}}/>
      }   
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
  },
  greetingText: {
    fontSize: 25,
    color: THEME.MAIN_COLOR
  }
})


export default ProfileScreen;