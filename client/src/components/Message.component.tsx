import React, { FC } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {THEME} from '../../theme';
import { iMsg } from '../screens/CurrentChat.screen';
import {useAppContext} from './../context/context';
import moment from 'moment';
interface MessageComponentProps {
  message: iMsg
};

export const MessageComponent: FC<MessageComponentProps> = ({message}) => {

    const {activeUserInfo} = useAppContext();
   
    return (
        <View
            style={message.authorFullName === `${activeUserInfo.firstName} ${activeUserInfo.lastName}`
            ? {
                ...styles.messageCont,
                alignSelf: 'flex-end'
            }
            : {
                ...styles.messageCont,
                alignSelf: 'flex-start',
                backgroundColor: 'gray'
            }}>
            <Text style={styles.messageAuthor}>{message.authorFullName}</Text>
            <Text style={styles.messageText}>{message.content}</Text>
            <Text style={styles.date}>{moment(message.date).format('HH:mm (DD:MM)')}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    messageCont: {
        backgroundColor: THEME.MAIN_COLOR,
        marginVertical: 5,
        padding: 7,
        minWidth: 140,
        minHeight: 70,
        borderRadius: 15
    },
    messageText: {
        color: '#fff',
        fontSize: 16
    },
    date: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        fontSize: 11,
        color: 'lightgray'
    },
    messageAuthor: {
        color: 'lightgray',
        fontSize: 12
    }
});