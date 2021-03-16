import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useAppContext } from './../context/context';
import { AppModal } from '../components/AddNewGroupChatModal';
import { UserPersonalChatsComponent } from '../components/UserPersonalChats.component';
import { AntDesign } from '@expo/vector-icons';
import { UserGroupChatsComponent } from '../components/UserGroupChats.component';
interface props {
  personalChatsGQL: any,
  groupChatsGQL: any,
  refetchPersonalChats: () => void,
  refetchArchivedChats: () => void
}

const AllChatsScreen: FC<props> = ({personalChatsGQL, groupChatsGQL, refetchPersonalChats, refetchArchivedChats}) => {

  const { openModal} = useAppContext();
  return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                   Personal chats
                </Text>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                { personalChatsGQL
                    && personalChatsGQL.chats
                    && personalChatsGQL.chats.getAllPersonalChatsByUserId.length !== 0
                      ? personalChatsGQL.chats.getAllPersonalChatsByUserId.map((chat: any) => {
                      return (                      
                        <UserPersonalChatsComponent chat={chat} key={chat._id} refetchPersonalChats={refetchPersonalChats} refetchArchivedChats={refetchArchivedChats} />                 
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
                groupChatsGQL
                  && groupChatsGQL.chats
                  && groupChatsGQL.chats.getGroupChatsById.length !== 0 
                    ? groupChatsGQL.chats.getGroupChatsById.map((chat: any) => {
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
    },
    indicatorStyles: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default AllChatsScreen;