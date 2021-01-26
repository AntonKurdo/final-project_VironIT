import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './src/navigation/Main.nav';


export default function App() {
  return (   
      <NavigationContainer>
           <MainNavigator />
      </NavigationContainer>     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
