import React, {FC, useState} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import { EvilIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { THEME } from './../../theme';
import { useAppContext } from '../context/context';
import httpService from '../services/http.service';

interface iCandidate {
  id: string,
  firstName: string,
  lastName: string,
  avatar: string 
}
const FriendsScreen: FC = () => {

  const  {activeUserInfo, friends, allUsers, addFriend, setNews} = useAppContext();
  const [searchingText, setSearchingText] = useState('');
  const [candidates, setCandidates] = useState<iCandidate[]>([]);
  const [isAllCandidates, setIsAllCandidates] = useState(false);

  const searchFriend = (name: string) => {    
    let currentCandidates = allUsers!.filter((candidate: any) => (candidate.firstName.toLowerCase() + ' ' + candidate.lastName.toLowerCase()).includes(name.toLowerCase()));   
    name 
      ? setCandidates(currentCandidates) 
      : setCandidates([])
  };

  return (
    <ScrollView style={styles.container}>  
      <View style={styles.findFriendsCont}>
        <View>
          <EvilIcons style={styles.searchIcon} name="search" size={24} color={THEME.MAIN_COLOR} />
          <TextInput 
              placeholder='Search a new friend here...'
              style={styles.searchInput}
              value={searchingText}
              onChangeText={(text) => {
                setSearchingText(text)
                searchFriend(text)
              }}
            />
            <TouchableOpacity style={styles.removeTextIcon} onPress={() => {
              setSearchingText('');
              setCandidates([]);
              setIsAllCandidates(false);
            }}>
              <Entypo name="circle-with-cross" size={24} color={THEME.MAIN_COLOR} />     
            </TouchableOpacity>             
        </View>
        <TouchableOpacity style={styles.seeAllBtn} onPress={() => {      
          if(isAllCandidates) {
            setIsAllCandidates(false);
            setCandidates([]);
          } else {
            setIsAllCandidates(true);
            setCandidates(allUsers!);
          }
        }}>
          <Text style={{color: 'gray'}}>{isAllCandidates ?  'Hide All' : 'See All'}</Text>
        </TouchableOpacity>
        
        <View style={styles.candidatesCont}>  
        {         
           candidates!.length !== 0 && candidates!.map((candidate: iCandidate) => {
              return (
                <View style={styles.candidate} key={candidate.id} >
                  <Image source={{uri: candidate.avatar}} style={styles.ava}/>
                  <Text>{candidate.firstName} {candidate.lastName}</Text>
                  <TouchableOpacity style={styles.chatBtn} onPress={async() => {
                       const result = await httpService.addFriend(activeUserInfo.id, candidate.id);
                       if(result) {
                          setNews!(await httpService.getNews(activeUserInfo.id))
                          addFriend!({
                            id: candidate.id,
                            firstName: candidate.firstName,
                            lastName: candidate.lastName,
                            avatar: candidate.avatar
                          })
                       }
                  }}>
                      <AntDesign name="adduser" size={25} color={THEME.MAIN_COLOR} />
                  </TouchableOpacity>                    
                </View>
              )
            })          
        }
        </View>
      </View> 
      <View style={styles.friendCont}>
        <Text style={styles.friendsTitle}>You have {friends!.length} friend(s):</Text>
        {         
            friends!.length !== 0 && friends!.map((friend: iCandidate) => {
                return (
                  <View style={styles.candidate} key={friend.id}>
                    <Image source={{uri: friend.avatar}} style={styles.ava}/>
                    <Text>{friend.firstName} {friend.lastName}</Text>                    
                    <TouchableOpacity style={styles.chatBtn}>
                      <AntDesign name="message1" size={28} color={THEME.MAIN_COLOR} />
                    </TouchableOpacity>
                  </View>
                )
              })          
        }
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  findFriendsCont: {
    paddingVertical: 30,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '90%',
    alignSelf: 'center'
  },
  searchInput: {
    width: THEME.INPUT_WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
    paddingVertical: 5,
    color: THEME.MAIN_COLOR,
    paddingHorizontal: 25
  },
  searchIcon: {
    position: 'absolute',
    top: 10    
  },
  removeTextIcon: {
    position: 'absolute',
    top: 10,
    right: 0
  },
  candidatesCont: {
    width: '100%',    
    marginTop: 10,
    alignItems: 'center'    
  },
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
    marginRight: 15
  },
  chatBtn: {
    position: 'absolute',
    right: 15
  },
  friendCont: {
    marginVertical: 10,
    alignItems: 'center'
  },
  friendsTitle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
    color: 'lightgray'
  },
  seeAllBtn: {
    marginTop: 10
  }
})

export default FriendsScreen