import React, {FC, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {THEME} from './../../theme';
import {iUser, useAppContext} from '../context/context';
import {takeNewAvatar} from './../services/takeNewAvatar.service';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import { CHANGE_AVATAR_MUTATION } from '../appollo/mutations/changeAva';
import { GET_ALL_FRIENDS_QUERY } from '../appollo/queries/getAllFriends';

const ProfileScreen : FC = () => {
    const {activeUserInfo, friends, changeAvatar, setIsLoadingFalse} = useAppContext();
    const navigation = useNavigation();
    const {data: allFriendsGQL, loading } = useQuery(GET_ALL_FRIENDS_QUERY, {
        variables: {
          userId: activeUserInfo.id
        }
      });

    useEffect(() => {
        setTimeout(setIsLoadingFalse, 200)
    }, []);

    const [changeAvaGQL, {}] = useMutation(CHANGE_AVATAR_MUTATION);
    
    const changeAvatarHandler = async() => {
        const newAva = await takeNewAvatar();
        if (newAva) {
            changeAvaGQL({
                variables: {
                    userId: activeUserInfo.id,
                    newAva
                }
            });
            changeAvatar!(newAva);
        }
    }

    return (
        <View style={styles.default}>         
            {
            activeUserInfo.avatar !== '' && <Image
                source={{
                uri: activeUserInfo.avatar
            }}
                style={{
                width: 160,
                height: 160,
                borderRadius: 80
            }}/>
}
            <Text style={styles.greetingText}>Hi, {activeUserInfo.firstName}!</Text>
            <View style={styles.optionsCont}>
                <View style={styles.header}>
                    <Text
                        style={{
                        color: 'lightgray'
                    }}>
                        Options:
                    </Text>
                </View>
                <View style={styles.optionsBody}>
                    <TouchableOpacity style={styles.btnCont} onPress={changeAvatarHandler}>
                        <Ionicons name="person-circle" size={35} color='#fff'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCont}
                        onPress={() => navigation.navigate('Posts')}>
                        <MaterialIcons name="post-add" size={35} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.friendsCont}>
                <View style={styles.header}>
                    <Text
                        style={{
                        color: 'lightgray'
                    }}>
                        Friends ({friends?.length}):
                    </Text>
                </View>
                {
                    loading 
                        ? <View>
                            <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
                          </View>
                        : <View                   
                        style={styles.friendsBody}>
                          {allFriendsGQL
                              && allFriendsGQL.friends.getAllFriendsByUserId
                              && allFriendsGQL.friends.getAllFriendsByUserId.map((friend : iUser) => {
                              return (
                                  <View key={friend._id} style={styles.friend}>
                                      <Image
                                          source={{
                                          uri: friend.avatar
                                      }}
                                          style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 25
                                      }}/>
                                      <Text style={styles.friendText}>{friend.first_name}</Text>
                                      <Text style={styles.friendText}>{friend.last_name}</Text>
                                  </View>
                              )
                          })
      }
                      </View>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    default: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: THEME.BTN_WIDTH,
        height: THEME.BTN_HEIGHT,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_COLOR
    },
    btnText: {
        fontSize: 20,
        color: '#fff'
    },
    greetingText: {
        fontSize: 25,
        color: THEME.MAIN_COLOR,
        marginBottom: 10
    },
    btnCont: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: THEME.BTN_HEIGHT,
        backgroundColor: THEME.MAIN_COLOR,
        borderRadius: 10,
        marginHorizontal: 15
    },
    btnAvaText: {
        color: '#fff',
        fontSize: 17
    },
    optionsCont: {
      width: '100%',
      padding: 5       
    },
    optionsBody: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
    friendsCont: {
        width: '100%',
        padding: 10
    },
    header: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    friendsBody: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,       
        alignSelf: 'center'       
    },
    friend: {
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        width: '21.5%'
    },
    friendText: {
        fontSize: 11,
        color: '#000'
    }
})

export default ProfileScreen;