import React, {FC, useState} from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAppContext } from './../context/context';
import { THEME } from './../../theme';
import httpService from '../services/http.service';


export interface iMember {
  _id: string,
  lastName: string,
  firstName: string
}

export const AppModal : FC = () => {

    const {friends, isModalOpen, closeModal, activeUserInfo, setUserGroupChat, userGroupChats} = useAppContext();
    
    const [changed, setChanged] = useState<Array<string>>([]);
    const [newChatMembers, setNewChatMembers] = useState<Array<iMember>>([{
      _id: activeUserInfo.id,
      firstName: activeUserInfo.firstName,
      lastName: activeUserInfo.lastName
    }])

    const addFriendToNewChat = (id: string, firstName: string, lastName: string) => {
      if(changed.includes(id)) {
        setChanged(changed.filter(item => item !== id))
        setNewChatMembers(newChatMembers.filter((item: iMember) => item._id !== id))
      } else {
        setChanged([...changed, id])
        setNewChatMembers([...newChatMembers, {
          _id: id, firstName, lastName
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
                  friends!.map((friend: any) => {
                    return (
                      <TouchableOpacity style={!changed.includes(friend.id) ? styles.wrapper : {...styles.wrapper, backgroundColor: 'lightgray'}} key={friend.id} onPress={addFriendToNewChat.bind(null, friend.id, friend.firstName, friend.lastName)}>
                        <Image source={{uri: friend.avatar}} style={styles.ava}/>
                        <Text>{friend.firstName} {friend.lastName}</Text> 
                        {
                          changed.includes(friend.id) 
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
      top: StatusBar.currentHeight! + 20,
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
      resizeMode: 'cover'
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