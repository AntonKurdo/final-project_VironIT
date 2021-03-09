import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { RouteProp } from '@react-navigation/native';

interface NotificationProps {
  route: RouteProp<{Notification: {
    body: string
  } }, 'Notification'>
};

const NotificationScreen: FC<NotificationProps> = ({route}) => {
  return (
    <View style={styles.container}>    
      <Text>{route.params.body}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default NotificationScreen;