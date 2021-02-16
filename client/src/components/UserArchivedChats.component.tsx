import {MaterialIcons} from '@expo/vector-icons';
import React, {FC} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {THEME} from '../../theme';
import httpService from '../services/http.service';
import {useAppContext} from './../context/context';

interface UserArchivedChatsComponentProps {
    chat : {
        id: string,
        avatar: string,
        firstName: string,
        lastName: string,
        chat_id: string
    }
};

export const UserArchivedChatsComponent : FC < UserArchivedChatsComponentProps > = ({chat}) => {
    const {activeUserInfo, unarchiveChat} = useAppContext();
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
                onPress={async() => {
                if (await httpService.unarchiveChat(activeUserInfo.id, chat.chat_id)) {
                    unarchiveChat !(chat);
                }
            }}>
                <MaterialIcons name="unarchive" size={30} color={THEME.MAIN_COLOR}/>
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