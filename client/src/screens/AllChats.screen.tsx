import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useAppContext } from './../context/context';
import { AppModal } from '../components/AddNewGroupChatModal';
import { UserPersonalChatsComponent } from '../components/UserPersonalChats.component';
import { AntDesign } from '@expo/vector-icons';
import { UserGroupChatsComponent } from '../components/UserGroupChats.component';

const AllChatsScreen: FC = () => {

  const { openModal, userGroupChats, userPersonalChats } = useAppContext();

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
                      <UserPersonalChatsComponent chat={chat} key={chat.id} />                 
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
                      <UserGroupChatsComponent chat={chat} key={chat._id}/>
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