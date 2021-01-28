import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { useAppContext } from '../context/context';

const SettingsScreen = () => {
  return (
    <View style={styles.default}>    
      <Text>SettingsScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default SettingsScreen;