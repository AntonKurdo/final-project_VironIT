import React, {FC, useEffect} from 'react';
import * as Notifications from 'expo-notifications'; 
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { THEME } from './../../theme';
import { useAppContext } from '../context/context';


const StartingScreen: FC = () => {
  const {isVerified} = useAppContext();
  const navigation = useNavigation(); 

  useEffect(() => {  
    Notifications.addNotificationReceivedListener((notification) => {});
    Notifications.addNotificationResponseReceivedListener((notification) => {       
        navigation.navigate('Notification', {
          body: notification.notification.request.content.body
        })
    })   
    return () => {
        Notifications.removeNotificationSubscription(Notifications.addNotificationReceivedListener((notification) => {}));
        Notifications.removeNotificationSubscription(Notifications.addNotificationResponseReceivedListener((notification) => {
          navigation.navigate('Notification', {
            body: notification.notification.request.content.body
          })    
        }));
    }
}, [])  

  return (
    <View style={styles.container}>   
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to <Text style={styles.appName}>OwlChat</Text></Text>
        <Text style={styles.subtitle}>...only fast and clever messaging!!!</Text>
      </View>     
      <Image style={styles.img} source={require('../../assets/logo.png')}/>
      <View>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={{...styles.btn, marginTop: 10}} onPress={() => isVerified ? navigation.navigate('Sign Up') : navigation.navigate('PhoneVerification')}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>         
      </View>
      <Text style={styles.author}>© Created by Anton Kurdo</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
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
  img: {   
    width: 350,
    height: 200,
    resizeMode: 'contain'
  },
  author: {
    position: 'absolute',
    bottom: 5,
    fontSize: 10,
    color: 'gray'
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  appName: {
    fontSize: 30,
    color: THEME.MAIN_COLOR,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 11,
    fontStyle: 'italic'
    
  }
})


export default StartingScreen;