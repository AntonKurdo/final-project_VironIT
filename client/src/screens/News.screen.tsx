import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import { PostComponent } from '../components/Post.component';
import { useAppContext } from '../context/context';
import { THEME } from './../../theme';

const NewsScreen: FC = () => {

  const {news, friends} = useAppContext();
  const [newsLocal, setNewsLocal] = useState(news);
  useEffect(() => {
    const newArr =  news!.map((item: any) => {
      const fr = friends!.find((friend: any) => friend.id === item.owner);
      return {
        ...item, 
        avatar: fr?.avatar,
        firstName: fr?.firstName,
        lastName: fr?.lastName
      }
    })
    setNewsLocal(newArr)
  }, [news])
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
  }
})

export default NewsScreen;