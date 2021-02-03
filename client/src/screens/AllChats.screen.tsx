import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import {THEME} from './../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from './../context/context';

const AllChatsScreen: FC = () => {

  const navigation = useNavigation();
  const { friends } = useAppContext();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    All my chats
                </Text>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                {
                  friends!.map((chat: any) => {
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
                    </View>
                    )
                  })
                }
            </ScrollView>

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
      marginRight: 15
    },
    chatBtn: {
      position: 'absolute',
      right: 15
    },
})

export default AllChatsScreen;