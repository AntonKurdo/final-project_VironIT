import { AntDesign } from '@expo/vector-icons';
import React, { FC } from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import { THEME } from '../../theme';
import { useAppContext } from './../context/context';
import { useMutation } from '@apollo/client';
import {ADD_FRIEND_MUTATION} from '../appollo/mutations/addFriend'
interface CandidateComponentProps {
  candidate: {
    _id: string,
    avatar: string,
    first_name: string,
    last_name: string
  },
  refetch: () => void
};

export const CandidateComponent: FC<CandidateComponentProps> = ({candidate, refetch}) => {
    const {activeUserInfo } = useAppContext();
    const [addFriendGQL] = useMutation(ADD_FRIEND_MUTATION);
  
    return (
        <View style={styles.candidate} key={candidate._id}>
            <Image
                source={{
                uri: candidate.avatar
            }}
                style={styles.ava}/>
            <Text>{candidate.first_name} {candidate.last_name}</Text>
            <TouchableOpacity
                style={styles.chatBtn}
                onPress={async() => {             
                  const res = await addFriendGQL({
                    variables: {
                      userId: activeUserInfo.id,
                      newFriendId: candidate._id
                    }
                  })
                  if(res.data.friends.addFriend.status === 'ok') {
                    refetch()                 
                  } else {
                    Alert.alert("Error...", res.data.friends.addFriend.message)
                  }               
            }}>
                <AntDesign name="adduser" size={25} color={THEME.MAIN_COLOR}/>
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

