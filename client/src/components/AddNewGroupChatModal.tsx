import React, {FC, useState} from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAppContext } from './../context/context';
import { THEME } from './../../theme';
import httpService from '../services/http.service';
import {useQuery} from '@apollo/client';
import { GET_ALL_FRIENDS_QUERY } from '../appollo/queries/getAllFriends';

export interface iMember {
  _id: string,
  lastName: string,
  firstName: string
}

export const AppModal : FC = () => {

    const {isModalOpen, closeModal, activeUserInfo, setUserGroupChat, userGroupChats} = useAppContext();
    const {data: friendsGQL} = useQuery(GET_ALL_FRIENDS_QUERY, {
      variables: {
        userId: activeUserInfo.id
      }
    })

    const [changed, setChanged] = useState<Array<string>>([]);
    const [newChatMembers, setNewChatMembers] = useState<Array<iMember>>([{
      _id: activeUserInfo.id,
      firstName: activeUserInfo.firstName,
      lastName: activeUserInfo.lastName
    }])

    const addFriendToNewChat = (_id: string, firstName: string, lastName: string) => {
      if(changed.includes(_id)) {
        setChanged(changed.filter(item => item !== _id))
        setNewChatMembers(newChatMembers.filter((item: iMember) => item._id !== _id))
      } else {
        setChanged([...changed, _id])
        setNewChatMembers([...newChatMembers, {
          _id, firstName, lastName
        }])
      }
    };

    const createChat = async () => {
      const usersId = newChatMembers.map(item => item._id);
      const usersLastNames = newChatMembers.map(item => item.lastName);    
      const groupChatObj = {_id: Date.now().toLocaleString(), usersLastNames, usersId};
      const res = await httpService.addGroupChat(groupChatObj);
      if(res) {
        setUserGroupChat!([...userGroupChats!, groupChatObj]);
        setChanged([]);
        closeModal!();
      }     
    }

    return (
        <Modal animationType='slide' transparent={false} visible={isModalOpen}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} onPress={() => {
                  closeModal!();
                  setChanged([])
                }}>
                   <AntDesign name="arrowleft" size={32} color={THEME.MAIN_COLOR} />
                </TouchableOpacity>
                {
                  friendsGQL
                    && friendsGQL.friends
                    && friendsGQL.friends.getAllFriendsByUserId.map((friend: any) => {
                      return (
                        <TouchableOpacity style={!changed.includes(friend._id) ? styles.wrapper : {...styles.wrapper, backgroundColor: THEME.MAIN_COLOR}} key={friend._id} onPress={addFriendToNewChat.bind(null,   friend._id, friend.first_name, friend.last_name)}>
                          <Image source={{uri: friend.avatar}} style={styles.ava}/>
                          <Text  style={changed.includes(friend._id) ? {color: '#fff'} : {color: '#000'}} >{friend.first_name} {friend.last_name}</Text> 
                          {
                            changed.includes(friend._id) 
                              ? <AntDesign style={styles.checkSign} name="check" size={24} color="green" /> 
                              : <AntDesign style={styles.checkSign} name="close" size={24} color="red" />
                          }                                               
                        </TouchableOpacity>
                      )
                  })
                }
                <TouchableOpacity style={styles.createChatBtn} onPress={createChat}>
                  <Text style={{color: THEME.MAIN_COLOR, fontSize: 18}}>Create chat</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backBtn: {
      position: 'absolute',
      top: StatusBar.currentHeight! + 50,
      left: 25
    },
    wrapper: {
      flexDirection: 'row',
      width: '80%',
      height: 50,
      borderWidth: 1,
      borderColor: THEME.MAIN_COLOR,
      marginBottom: 5,
      borderRadius: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    ava: {
      width: 35,
      height: 35,
      marginRight: 20,
      resizeMode: 'cover',
      borderRadius: 17.5
    },
    checkSign: {
      position: 'absolute',
      right: 20
    },
    createChatBtn: {
      borderWidth: 1,
      borderColor: THEME.MAIN_COLOR,
      width: THEME.BTN_WIDTH,
      height: THEME.BTN_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 20
    }
})