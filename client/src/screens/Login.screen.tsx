import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const LoginScreen: FC = () => {
  return (
    <View style={styles.container}>    
      <Text>Login Screen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default LoginScreen;