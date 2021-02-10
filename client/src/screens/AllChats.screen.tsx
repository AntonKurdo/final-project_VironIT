import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import {THEME} from './../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from './../context/context';
import { AppModal } from '../components/AddNewGroupChatModal';
import httpService from '../services/http.service';

const AllChatsScreen: FC = () => {

  const navigation = useNavigation();
  const { activeUserInfo, openModal, userGroupChats, userPersonalChats, archiveChat } = useAppContext();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                   Personal chats
                </Text>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                {
                  userPersonalChats?.length !== 0
                    ? userPersonalChats!.map((chat: any) => {
                    return (
                      <View style={styles.chat} key={chat.id} >
                      <Image source={{uri: chat.avatar}} style={styles.ava}/>
                      <Text>{chat.firstName} {chat.lastName}</Text>
                      <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('Current chat', {
                        id: chat.id,
                        avatar: chat.avatar,
                        fullName: `${chat.firstName} ${chat.lastName}`
                      })}>
                          <AntDesign name="message1" size={25} color={THEME.MAIN_COLOR} />
                      </TouchableOpacity>  
                      <TouchableOpacity style={styles.archiveBtn} onPress={async () => {
                        if(await httpService.archiveChat(activeUserInfo.id, chat.chat_id)) {
                          archiveChat!(chat)
                        }
                      }}>
                          <MaterialIcons name="archive" size={30} color={THEME.MAIN_COLOR} />
                      </TouchableOpacity>                     
                    </View>
                    )
                  })
                  : (
                    <View style={styles.emptyCont}>
                      <Text style={styles.emptyText}>No personal chats...</Text>
                    </View>
                  )
                }
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Group chats
                </Text>
                <TouchableOpacity style={styles.addGroupChatBtn} onPress={openModal}>
                  <AntDesign name="addusergroup" size={27} color="gray" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                { 
                  userGroupChats?.length !== 0 
                    ? userGroupChats!.map((chat: any) => {
                    return (
                      <View style={styles.chat} key={chat._id} >
                        <Image source={require('../../assets/group-chat-image.png')} style={styles.ava}/>
                        <Text> {chat.usersLastNames.join(', ')} </Text>
                        <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('Group chat', {
                          id: chat._id,                          
                          lastNames: chat.usersLastNames.join(', ')
                        })}>
                            <AntDesign name="message1" size={25} color={THEME.MAIN_COLOR} />
                        </TouchableOpacity>                    
                      </View>
                    )
                  })
                  : (
                    <View style={styles.emptyCont}>
                      <Text style={styles.emptyText}>No group chats...</Text>
                    </View>
                  )
                }
            </ScrollView>
            <AppModal />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1    
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    headerTitle: {
      fontSize: 18,
      color: 'gray'
    },
    chatsWrapper: {
      paddingVertical: 10
    },
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
    },
    addGroupChatBtn: {
      position: 'absolute',
      right: 25
    },
    emptyCont: {
      flex: 1,      
      alignItems: 'center'
    },
    emptyText: {
      fontSize: 17,
      color: 'lightgray'
    }
})

export default AllChatsScreen;