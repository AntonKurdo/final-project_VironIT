import React, {FC} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PostComponent } from '../components/Post.component';
import { useAppContext } from '../context/context';


const MyPosts = () => {

  const {posts} = useAppContext();

  return (
    <ScrollView>           
      {
        posts?.map(post => {
          return (
             <PostComponent  key={post._id} post={post}/>   
          )
        })
      }

    </ScrollView>
  )
};

export default MyPosts;