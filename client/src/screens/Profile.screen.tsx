import React, {FC, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { THEME } from './../../theme';
import { useAppContext } from '../context/context';
import { takeNewAvatar } from './../services/takeNewAvatar.service';
import httpService from '../services/http.service';

const ProfileScreen: FC = () => {
  const {activeUserInfo, changeAvatar, setIsLoadingFalse}  = useAppContext(); 
  
  useEffect(() => {
    setTimeout(setIsLoadingFalse, 200)
  }, []) 

  const changeAvatarHendler = async () => {
    const newAva = await takeNewAvatar();
    if(newAva) {      
      httpService.changeAvatar(activeUserInfo.id, newAva)
      changeAvatar!(newAva)
    }    
  }

  return (
    <View style={styles.default}>    
      <Text style={styles.greetingText}>Hi, {activeUserInfo.firstName}!</Text>   
      {
        activeUserInfo.avatar !== '' && <Image source={{uri: activeUserInfo.avatar}}  style={{width: 150, height: 150}}/>
      }   
      <TouchableOpacity style={styles.avaBtn} onPress={changeAvatarHendler}>
        <Text style={styles.btnAvaText}>Change avatar</Text>
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
  },
  greetingText: {
    fontSize: 25,
    color: THEME.MAIN_COLOR,
    marginBottom: 10
  },
  avaBtn: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: THEME.BTN_WIDTH,
    height: THEME.BTN_HEIGHT,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 10   
  },
  btnAvaText: {
    color: '#fff',
    fontSize: 17
  }
})


export default ProfileScreen;