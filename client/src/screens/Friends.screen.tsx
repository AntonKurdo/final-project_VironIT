import React, {FC, useState} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { EvilIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { THEME } from './../../theme';
import { useAppContext } from '../context/context';
import { FriendComponent } from '../components/Friend.component';
import { CandidateComponent } from '../components/Candidate.components';
import {useQuery} from '@apollo/client';
import { GET_ALL_USERS_QUERY } from '../appollo/queries/getAllUsers';
import { GET_ALL_FRIENDS_QUERY } from '../appollo/queries/getAllFriends';

const FriendsScreen: FC = () => {
 
  const {friends, activeUserInfo} = useAppContext();
  const [searchingText, setSearchingText] = useState('');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [isAllCandidates, setIsAllCandidates] = useState(false); 

  const {data: allUsersGQL} = useQuery(GET_ALL_USERS_QUERY);
  const {data: allFriendsGQL, loading,  refetch: refetchFriends } = useQuery(GET_ALL_FRIENDS_QUERY, {
    variables: {
      userId: activeUserInfo.id
    }
  });

  const searchFriend = (name: string) => {    
    let currentCandidates = allUsersGQL 
      && allUsersGQL.friends
      && allUsersGQL.friends.getAllUsers
        .filter((user: any) => user.first_name + user.last_name !== activeUserInfo.firstName + activeUserInfo.lastName)
        .filter((candidate: any) => (candidate.first_name.toLowerCase() + ' ' + candidate.last_name.toLowerCase()).includes(name.toLowerCase()));   
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
              <Entypo name="circle-with-cross" size={22} color={THEME.MAIN_COLOR} />     
            </TouchableOpacity>             
        </View>
        <TouchableOpacity style={styles.seeAllBtn} onPress={() => {      
          if(isAllCandidates) {
            setIsAllCandidates(false);
            setCandidates([]);
          } else {
            setIsAllCandidates(true);
            setCandidates(allUsersGQL.friends.getAllUsers.filter((user: any) => user.first_name + user.last_name !== activeUserInfo.firstName + activeUserInfo.lastName));
          }
        }}>
          <Text style={{color: 'gray'}}>{isAllCandidates ?  'Hide All' : 'See All'}</Text>
        </TouchableOpacity>
        
        <View style={styles.candidatesCont}>  
        {         
           candidates!.length !== 0 && candidates!.map((candidate: any) => {
              return (
                <CandidateComponent candidate={candidate} key={candidate._id} refetch={refetchFriends}/>
              )
            })          
        }
        </View>
      </View> 
      {
        loading
          ? <View >
              <ActivityIndicator size='large' color={THEME.MAIN_COLOR}/>
            </View>           
          : <View style={styles.friendCont}>
                <Text style={styles.friendsTitle}>You have {friends!.length} friend(s):</Text>
                {         
                    allFriendsGQL 
                    && allFriendsGQL.friends
                    && allFriendsGQL.friends.getAllFriendsByUserId.length !== 0 
                    && allFriendsGQL.friends.getAllFriendsByUserId.map((friend: any) => {
                        return (
                        <FriendComponent friend={friend} key={friend._id} refetch={refetchFriends}/>
                        )
                      })          
                }
            </View>
      }
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
    paddingVertical: 10,
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