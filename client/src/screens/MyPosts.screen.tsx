import React, {FC} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { PostComponent } from '../components/Post.component';
import { useAppContext } from '../context/context';


const MyPosts = () => {

  const {posts} = useAppContext();
  if(posts?.length === 0) {
    return (
      <View style={styles.container}> 
        <Text style={styles.text}>You have no any post...</Text>
      </View>
    )
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    color: 'lightgray'
  }
})

export default MyPosts;