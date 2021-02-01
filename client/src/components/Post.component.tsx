import React, { FC, useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image    
} from 'react-native';
import { Dimensions, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import httpService from '../services/http.service';
import { useAppContext } from '../context/context';
import { THEME } from './../../theme';

export interface iPost {
    _id : string,
    date : Date,
    likes : Array<string>,
    title : string,
    text : string,
    picture : string,
    owner : string    
}

export interface iComment {
    _id?: string,
    postId: string,
    userId: string,
    userName: string,
    userAva: string,
    date?: Date,
    text: string
}

interface props {
    post : iPost
}

export const PostComponent : FC < props > = ({post}) => {

  const {activeUserInfo,  likePostById} = useAppContext(); 
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isFavorite, setIsFavourite] = useState(post.likes.includes(activeUserInfo.id));
  const [comments, setComments] = useState([]);
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [commentText, setCommentText] = useState('');

  const likeHandler = async (postId: string) => {          
        setIsBtnDisabled(true);
        const res = await httpService.likePostById(postId, activeUserInfo.id);
        if(res) {          
          likePostById!(postId);
          setIsBtnDisabled(false); 
          if(isFavorite) {
              setIsFavourite(false)
          } else {
              setIsFavourite(true)
          }        
        }
  };
  
  const addNewComment = async (postId: string) => {
    if(commentText) {
        const newComment: iComment = {
            postId,
            userId: activeUserInfo.id,
            userName: `${activeUserInfo.firstName} ${activeUserInfo.lastName}`,
            userAva: activeUserInfo.avatar,
            text: commentText
        }
        await httpService.addNewComment(newComment);
        setComments(await httpService.getCommentsByPostId(postId))
        setCommentText('');
    } else {
        Alert.alert('Error', 'Comment should not be empty!!!')
    }

  };

  const openComments = async (postId: string) => {
    if(comments.length == 0) {
       setComments(await httpService.getCommentsByPostId(postId))
    }
    setIsCommentsShown(!isCommentsShown)
  };

  const refreshComments = async (postId: string) => {
    setComments(await httpService.getCommentsByPostId(postId))
  }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                uri: post.picture
            }}
                style={styles.image}>
                <View style={styles.wrapperTitle}>
                    <Text style={styles.text}>{post.title}</Text>
                    <Text style={styles.likesNumber}>{post.likes.length}</Text>
                    <TouchableOpacity
                        disabled={isBtnDisabled}
                        style={styles.btnLike}
                        onPress={likeHandler.bind(null, post._id)}>
                        {isFavorite
                            ? <AntDesign name="heart" size={24} color='#fff'/>
                            : <AntDesign name="hearto" size={24} color='#fff'/>}
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.wrapperBody}>
                    <Text style={styles.bodyText}>{post.text}</Text>
                </ScrollView>
            </ImageBackground>
            <View style={styles.commentsCont}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.commentsHeader} onPress={openComments.bind(null, post._id)}>
                        <Text style={{color: '#fff', fontSize: 17, marginRight: 10}}>comments</Text>
                    {
                        !isCommentsShown 
                            ?  <AntDesign name="arrowdown" size={17} color='#fff' />
                            :  <AntDesign name="arrowup" size={17} color='#fff' />
                    }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshBtn} onPress={refreshComments.bind(null, post._id)}>
                        <FontAwesome name="refresh" size={24} color='#fff' />
                    </TouchableOpacity>
                </View>
               
                {   isCommentsShown &&  comments.length !== 0 
                    ? comments.map((comment: iComment) => {
                            return (
                                <View style={styles.commentWrapper} key={comment._id}> 
                                    <View style={styles.commentHeader}>
                                        <Image source={{uri: comment.userAva}} style={styles.ava}/>
                                        <Text style={styles.commentAuthorName}>{comment.userName}</Text>      
                                        <Text style={styles.commentDate}>{new Date(post.date).toDateString()}</Text> 
                                    </View>
                                    <View style={styles.commentText}> 
                                        <Text style={{color: '#fff'}}>{comment.text}</Text>
                                    </View>
                                </View>
                            )
                    })
                    : isCommentsShown && <Text style={{color: '#fff', marginLeft: 20}}>There is no comments yet. You can add first!!!</Text> 
                 
                }
                <View>
                    <TextInput 
                        style={styles.commentInput}
                        multiline={true}
                        placeholder='Text here...'
                        value={commentText}
                        onChangeText={setCommentText}
                    />
                    <TouchableOpacity style={styles.sendCommentBtn} onPress={addNewComment.bind(null, post._id)}>
                      <MaterialCommunityIcons 
                        name="telegram" 
                        size={30} 
                        color="white" 
                    />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        minHeight: 470,
        marginVertical: 5,
        marginHorizontal: 5       
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: 'space-between'
    },
    wrapperTitle: {
        width: Dimensions
            .get('screen')
            .width - 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    text: {
        fontSize: 20,
        color: '#fff'
    },
    wrapperBody: {
        width: Dimensions
            .get('screen')
            .width - 10,
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
    },
    commentsCont: {
        backgroundColor: THEME.MAIN_COLOR,        
        paddingBottom: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    commentsHeader: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingVertical: 5        
    },
    commentInput: {
        marginVertical: 5,
        paddingVertical: 3,
        paddingLeft: 5,
        paddingRight: 35,
        alignSelf: 'center',
        width: '95%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'white',
        borderRadius: 3
    },
    sendCommentBtn: {
        position: 'absolute',
        right: 20,
        bottom: 7       
    },
    commentWrapper: {
        width: '95%',       
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        marginBottom: 10
    },
    commentHeader: {    
        height: 40,
        width: '100%',
        marginBottom: -5,
        flexDirection: 'row',
        paddingHorizontal: 20,   
        alignItems: 'center',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
      },
      ava: {
        width: 25,
        height: 25,
        marginRight: 10
      },
      commentAuthorName: {
        marginRight: 20,
        fontSize: 15,
        color: '#fff'
      },
      commentDate: {
        position: 'absolute',
        right: 10,
        color: '#fff'
      },
      commentText: {
          padding: 10          
      },
      refreshBtn: {
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
        width: 30
      }
})