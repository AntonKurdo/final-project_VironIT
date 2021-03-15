import React, {FC} from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../../theme';
import { useAppContext } from './../context/context';
import { useMutation } from '@apollo/client';
import { ARCHIVE_CHAT_MUTATION } from '../appollo/mutations/archiveChat';
interface UserPersonalChatsComponentProps {
  chat: {
    id: string,
    avatar: string,
    firstName: string,
    lastName: string,
    chat_id: string
  }
};

export const UserPersonalChatsComponent: FC<UserPersonalChatsComponentProps> = ({chat}) => {
  
    const navigation = useNavigation();
    const {activeUserInfo, archiveChat} = useAppContext();
    const [archiveChatGQL, {data}] = useMutation(ARCHIVE_CHAT_MUTATION);
    return (
        <View style={styles.chat}>
            <Image
                source={{
                uri: chat.avatar
            }}
                style={styles.ava}/>
            <Text>{chat.firstName} {chat.lastName}</Text>
            <TouchableOpacity
                style={styles.chatBtn}
                onPress={() => navigation.navigate('Current chat', {
                id: chat.id,
                avatar: chat.avatar,
                fullName: `${chat.firstName} ${chat.lastName}`
            })}>
                <AntDesign name="message1" size={25} color={THEME.MAIN_COLOR}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.archiveBtn}
                onPress={async() => {
                  archiveChatGQL({                  
                    variables: {
                      userId: activeUserInfo.id,
                      chatId: chat.chat_id
                  }
                  })              
                  archiveChat!(chat);
                
            }}>
                <MaterialIcons name="archive" size={30} color={THEME.MAIN_COLOR}/>
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
  },
  archiveBtn: {
    position: 'absolute',
    right: 50
  }  
})