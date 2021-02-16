import { AntDesign } from '@expo/vector-icons';
import React, {FC} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import { THEME } from '../../theme';
import { useNavigation } from '@react-navigation/native';

interface UserGroupChatsProps {
  chat: {
    _id: string,
    usersLastNames: Array<string>
  }
};

export const UserGroupChatsComponent : FC<UserGroupChatsProps> = ({chat}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.chat}>
            <Image
                source={require('../../assets/group-chat-image.png')}
                style={styles.ava}/>
            <Text>
                {chat
                    .usersLastNames
                    .join(', ')}
            </Text>
            <TouchableOpacity
                style={styles.chatBtn}
                onPress={() => navigation.navigate('Group chat', {
                id: chat._id,
                lastNames: chat
                    .usersLastNames
                    .join(', ')
            })}>
                <AntDesign name="message1" size={25} color={THEME.MAIN_COLOR}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
  chat: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center'    
  },
  ava: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 20
  },
  chatBtn: {
    position: 'absolute',
    right: 15
  }
});