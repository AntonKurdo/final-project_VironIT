import React, {FC} from 'react';
import {StyleSheet, View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { PostComponent } from '../components/Post.component';
import { useAppContext } from '../context/context';
import {useQuery} from '@apollo/client';
import { GET_All_POSTS_BY_ID_QUERY } from '../appollo/queries/getAllPostsById';
import { THEME } from '../../theme';
import { useNavigation } from '@react-navigation/core';

const MyPosts = () => {

  const {activeUserInfo} = useAppContext();
  const navigation = useNavigation();
  const{data, loading, refetch} = useQuery(GET_All_POSTS_BY_ID_QUERY, {
      variables: {
            userId: activeUserInfo.id
      }
  });  
  navigation.addListener('focus', () => {
    refetch();
  })
  
  if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={THEME.MAIN_COLOR}/>
        </View>
    )
};
  if(data && data.posts && data.posts.getUserPostsById.length === 0) {
    return (
      <View style={styles.container}> 
        <Text style={styles.text}>You have no any post...</Text>
      </View>
    )
  }
  return (
    <ScrollView>           
      {
        data && data.posts && data.posts.getUserPostsById.map((post: any) => {
          return (
             <PostComponent key={post._id} post={post} refetch={refetch}/>   
          )
        })
      }

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    color: 'lightgray'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
})

export default MyPosts;