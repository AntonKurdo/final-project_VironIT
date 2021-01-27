import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/Main.nav';

const App = () => {
  return (   
      <NavigationContainer>
           <MainNavigator />
      </NavigationContainer>     
  );
};

export default App;

