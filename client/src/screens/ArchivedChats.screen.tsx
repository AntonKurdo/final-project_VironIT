import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {THEME} from '../../theme';
import {useAppContext} from './../context/context';
import httpService from '../services/http.service';

const ArchivedChatsScreen = () => {
    
    const {activeUserInfo, userArchivedChats, unarchiveChat} = useAppContext();    
   
    return (
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Archived chats
                </Text>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                {userArchivedChats
                    ?.length === 0
                        ? (
                            <View style={styles.emptyCont}>
                                <Text style={styles.emptyText}>You have no any archived chats...</Text>                          
                            </View>
                        )
                        : userArchivedChats !.map((chat : any) => {
                            return (
                                <View style={styles.chat} key={chat.id}>
                                    <Image
                                        source={{
                                        uri: chat.avatar
                                    }}
                                        style={styles.ava}/>
                                    <Text>{chat.firstName} {chat.lastName}</Text>
                                    <TouchableOpacity style={styles.chatBtn} onPress={async() => {
                                     if(await httpService.unarchiveChat(activeUserInfo.id, chat.chat_id)) {
                                        unarchiveChat!(chat);
                                     }
                                    }}>
                                        <MaterialIcons name="unarchive" size={30} color={THEME.MAIN_COLOR}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#fff'
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
    emptyCont: {
      height: Dimensions.get('screen').height * 0.6,     
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    emptyText: {
      color: 'lightgray',
      fontSize: 20     
    }
})

export default ArchivedChatsScreen