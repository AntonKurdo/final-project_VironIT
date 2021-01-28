import React, {FC} from 'react';
import {StyleSheet, View, ImageBackground, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export interface iPost {
  _id?: string,
  date: Date,
  likes: number,
  isFavourite: boolean,
  title: string,
  text: string,
  picture: string,
  owner: string
}

interface props {
  post: iPost
}

export const PostComponent : FC<props> = ({post}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: post.picture}} style={styles.image}>
              <View style={styles.wrapperTitle}>
                 <Text style={styles.text}>{post.title}</Text>
                 <Text style={styles.likesNumber}>{post.likes}</Text>
                 <TouchableOpacity style={styles.btnLike}>
                   {
                     post.isFavourite 
                       ? <AntDesign name="heart" size={24} color='#fff' />
                       : <AntDesign name="hearto" size={24} color='#fff' />
                   }                    
                 </TouchableOpacity>
              </View>               
              <ScrollView style={styles.wrapperBody}>                 
                  <Text style={styles.bodyText}>{post.text}</Text>
              </ScrollView>               
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {       
        height: 270,
        marginVertical: 5,
        marginHorizontal: 5
         
    },
    image: {
      flex: 1,
      resizeMode: "contain",
      justifyContent: 'space-between'
    },
    wrapperTitle: {
      width: Dimensions.get('screen').width - 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      backgroundColor: 'rgba(0,0,0,0.4)',         
    },
    text: { 
      fontSize: 20,
      color: '#fff'  
    },
    wrapperBody: {
      width: Dimensions.get('screen').width - 10,      
      height: 50,
      backgroundColor: 'rgba(0,0,0,0.4)'     
    },
    bodyText: {
      alignSelf: 'center',
      fontSize: 15,
      color: '#fff',
      width: '90%',
      overflow: 'scroll'
    },
    btnLike: {
      position: 'absolute',
      right: 15
    },
    likesNumber: {
      position: 'absolute',
      right: 45,
      color: '#fff',
      fontSize: 20
    }

})