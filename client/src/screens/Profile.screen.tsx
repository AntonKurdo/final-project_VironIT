import { useNavigation } from '@react-navigation/native';
import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { THEME } from './../../theme';

const ProfileScreen: FC = () => {

  const navigation = useNavigation();

  const logoutHandler = () => {
    navigation.navigate('Home');
  }
  return (
    <View style={styles.default}>    
      <Text>ProfileScreen</Text>
      <TouchableOpacity style={styles.btn} onPress={logoutHandler}>
        <Text style={styles.btnText}>Log Out</Text>
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