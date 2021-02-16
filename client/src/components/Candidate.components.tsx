import { AntDesign } from '@expo/vector-icons';
import React, { FC } from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import { THEME } from '../../theme';
import httpService from '../services/http.service';
import { useAppContext } from './../context/context';

interface CandidateComponentProps {
  candidate: {
    id: string,
    avatar: string,
    firstName: string,
    lastName: string
  }
};

export const CandidateComponent: FC<CandidateComponentProps> = ({candidate}) => {
    const {activeUserInfo, addFriend, setNews} = useAppContext();
    return (
        <View style={styles.candidate} key={candidate.id}>
            <Image
                source={{
                uri: candidate.avatar
            }}
                style={styles.ava}/>
            <Text>{candidate.firstName} {candidate.lastName}</Text>
            <TouchableOpacity
                style={styles.chatBtn}
                onPress={async() => {
                const result = await httpService.addFriend(activeUserInfo.id, candidate.id);
                if (result) {
                    addFriend !({id: candidate.id, firstName: candidate.firstName, lastName: candidate.lastName, avatar: candidate.avatar})
                    setNews!(await httpService.getNews(activeUserInfo.id))
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