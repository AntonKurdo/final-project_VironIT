import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Image, Text, ActivityIndicator} from 'react-native';
import { PostComponent } from '../components/Post.component';
import { useAppContext } from '../context/context';
import { THEME } from './../../theme';
import {useQuery} from '@apollo/client';
import { GET_NEWS_QUERY } from '../appollo/queries/getNews';
import { useNavigation } from '@react-navigation/core';

const NewsScreen: FC = () => {

  const {friends, activeUserInfo} = useAppContext();
  const navigation = useNavigation();
  const {data, loading, refetch} = useQuery(GET_NEWS_QUERY, {
    variables: {
      userId: activeUserInfo.id
    }
  })
  const [newsLocal, setNewsLocal] = useState<any[]>([]); 
  navigation.addListener('focus', () => {
   refetch()
  });

  
  useEffect(() => {    
    if(data && data.posts.getNews) {
      const newArr =  data.posts.getNews.map((item: any) => {
        const fr = friends!.find((friend: any) => friend.id === item.owner);
        return {
          ...item, 
          avatar: fr?.avatar,
          firstName: fr?.firstName,
          lastName: fr?.lastName
        }
      })
      setNewsLocal(newArr)
    }
  }, [data])

  if (loading) {
    return (       
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={THEME.MAIN_COLOR}/>
        </View>   
    )
};
  return (
    <ScrollView style={styles.container}>    
        {
          newsLocal!.map((post: any) => {
            return (
              <View key={post._id} style={styles.wrapper}>                
                  <View style={styles.postHeader}>
                     <Image source={{uri: post.avatar}} style={styles.ava}/>
                     <Text style={styles.postAuthorName}>{post.firstName} {post.lastName}</Text>      
                     <Text style={styles.postDate}>{new Date(post.date).toDateString()}</Text> 
                  </View>
                 <PostComponent post={post} />
              </View>             
            )
          })
        }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {   
    marginVertical: 5,   
    paddingTop: 3,
  },
  postHeader: { 
    alignSelf: 'center',   
    height: 50,
    width: '97%',
    marginBottom: -5,
    flexDirection: 'row',
    paddingHorizontal: 20,   
    alignItems: 'center',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: THEME.MAIN_COLOR
  },
  ava: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 20
  },
  postAuthorName: {
    marginRight: 20,
    fontSize: 20,
    color: THEME.MAIN_COLOR
  },
  postDate: {
    position: 'absolute',
    right: 10,
    color: 'gray'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
})

export default NewsScreen;