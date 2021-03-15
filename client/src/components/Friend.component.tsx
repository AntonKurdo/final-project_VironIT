import { Entypo } from '@expo/vector-icons';
import React, { FC } from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from './../context/context';
import { THEME } from '../../theme';
import {useMutation} from '@apollo/client'
import { REMOVE_FRIEND_MUTATION } from '../appollo/mutations/removeFriend';
import { ADD_PERSONAL_CHAT_MUTATION } from '../appollo/mutations/addNewPersonalChatToUser';
interface FriendComponentProps {
  friend: {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string
  }
}

export const FriendComponent: FC<FriendComponentProps> = ({friend}) => {
    
    const navigation = useNavigation();
    const {activeUserInfo, removeFriend} = useAppContext();

    const [removeFriendGQL, {data}] = useMutation(REMOVE_FRIEND_MUTATION);
    const [addNewPersonalChatToUserGQL ] = useMutation(ADD_PERSONAL_CHAT_MUTATION);

    return (
        <View style={styles.candidate} key={friend.id}>
            <Image
                source={{
                uri: friend.avatar
            }}
                style={styles.ava}/>
            <Text>{friend.firstName} {friend.lastName}</Text>
            <TouchableOpacity style={styles.chatBtn}>
                <Menu>
                    <MenuTrigger>
                        <Entypo name="dots-three-vertical" size={24} color={THEME.MAIN_COLOR}/>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption
                            onSelect={async() => {
                                addNewPersonalChatToUserGQL({
                                    variables: {
                                        userId: activeUserInfo.id,
                                        secondUserId: friend.id
                                    }
                                })                          
                                navigation.navigate('Current chat', {
                                    id: friend.id,
                                    avatar: friend.avatar,
                                    fullName: `${friend.firstName} ${friend.lastName}`
                                })                            
                        }}>
                            <Text
                                style={{
                                fontSize: 20
                            }}>Send message</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={async() => {
                            try {                                                   
                                removeFriendGQL({
                                    variables: {
                                        userId: activeUserInfo.id,
                                        friendId: friend.id
                                    }
                                });                               
                                removeFriend!(friend.id)
                            } catch (e) {
                                console.log(e)
                            }
                        }}>
                            <Text
                                style={{
                                fontSize: 20,
                                color: 'red'
                            }}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
  candidate: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '90%',
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
    borderRadius: 20,
    marginRight: 15
  },
  chatBtn: {
    position: 'absolute',
    right: 15
  }
});