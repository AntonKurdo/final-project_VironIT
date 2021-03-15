import React, {FC, useState} from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,    
    ActivityIndicator
} from 'react-native';
import {Dimensions, Alert} from 'react-native';
import {AntDesign, MaterialCommunityIcons, FontAwesome, Entypo} from '@expo/vector-icons';
import {useAppContext} from '../context/context';
import {THEME} from './../../theme';
import {Video} from 'expo-av';
import { CommentComponent } from './Comment.component';
import  {All_COMMENTS_BY_POST_ID_QUERY} from '../appollo/queries/query';
import {useMutation, useLazyQuery} from '@apollo/client';
import { LIKE_POST_MUTATION } from '../appollo/mutations/likePost';
import { ADD_NEW_COMMENT_MUTATION } from '../appollo/mutations/addNewComment';
export interface iPost {
    _id : string,
    date : Date,
    likes : Array < string >,
    title : string,
    text : string,
    picture : string,
    video: string,
    owner : string
};

export interface iComment {
    _id?: string,
    postId : string,
    userId : string,
    userName : string,
    userAva : string,
    date?: Date,
    text : string
};

interface props {
    post : iPost, 
    refetch: () => {}
};

export const PostComponent : FC < props > = ({post, refetch}) => {

    const [getAllComments, {data, loading }] = useLazyQuery(All_COMMENTS_BY_POST_ID_QUERY, {
        variables: {
            postId: post._id
        }      
    });

    const [likePostByIdGQL, {}] = useMutation(LIKE_POST_MUTATION);
    const [ addNewCommentGQL, {} ] = useMutation(ADD_NEW_COMMENT_MUTATION);

    const {activeUserInfo, likePostById} = useAppContext();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isFavorite, setIsFavourite] = useState(post.likes.includes(activeUserInfo.id));  
    const [isCommentsShown, setIsCommentsShown] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isMuted, setIsMuted] = useState(true);

    const likeHandler = async(postId : string) => {
        setIsBtnDisabled(true);
        const res = await likePostByIdGQL({
            variables: {
                postId,
                userId: activeUserInfo.id
            }
        });
        if (res) {
            likePostById!(postId);
            refetch()
            setIsBtnDisabled(false);
            if (isFavorite) {
                setIsFavourite(false)
            } else {
                setIsFavourite(true)
            }
        }
    };

    const addNewComment = async(postId : string) => {
        if (commentText) {
            const newComment : iComment = {
                postId,
                userId: activeUserInfo.id,
                userName: `${activeUserInfo.firstName} ${activeUserInfo.lastName}`,
                userAva: activeUserInfo.avatar,
                text: commentText
            }            
            addNewCommentGQL({
                variables: {...newComment}
            })
            getAllComments();
            setCommentText('');
        } else {
            Alert.alert('Error', 'Comment should not be empty!!!');
        }

    };

    const openComments = async(postId : string) => {
        if (!data) {         
            getAllComments({variables: {
                postId
            }});            
        }
        setIsCommentsShown(!isCommentsShown)
    };

    const refreshComments = async(postId : string) => {
        getAllComments({variables: {
            postId
        }});
    }

    return (
        <View style={styles.container}>
            {post.picture !== '' 
                ? (
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
                ) 
                : (
                    <View> 
                        <Video
                                source={{
                                uri: post.video
                            }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={isMuted}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{
                                width: '100%',
                                height: 400
                            }}/>
                          <View style={{...styles.wrapperTitle, position: 'absolute', top: 0}}>
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
                        <TouchableOpacity style={styles.soundBtn} onPress={() => setIsMuted(!isMuted)}>
                            {
                                !isMuted 
                                    ?  <Entypo name="sound" size={30} color='#fff' />
                                    :  <Entypo name="sound-mute" size={30} color='#fff' />
                            }                           
                        </TouchableOpacity>    
                        
                    </View>
                )
}

            <View style={styles.commentsCont}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        style={styles.commentsHeader}
                        onPress={openComments.bind(null, post._id)}>
                        <Text
                            style={{
                            color: '#fff',
                            fontSize: 17,
                            marginRight: 10
                        }}>comments</Text>
                        {isCommentsShown
                            ? <AntDesign
                                    name="arrowdown"
                                    style={{
                                    alignSelf: 'center'
                                }}
                                    size={17}
                                    color='#fff'/>
                            : <AntDesign
                                name="arrowup"
                                style={{
                                alignSelf: 'center'
                            }}
                                size={17}
                                color='#fff'/>
}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.refreshBtn}
                        onPress={refreshComments.bind(null, post._id)}>
                        <FontAwesome name="refresh" size={24} color='#fff'/>
                    </TouchableOpacity>
                </View>

                {loading 
                    ? <ActivityIndicator size='large' color='white' />
                    : isCommentsShown && data && data.comments && data.comments.getCommentsByPostId.length !== 0
                        ? data.comments.getCommentsByPostId.map((comment : iComment) => {
                            return (
                                <CommentComponent comment={comment} date={post.date} key={comment._id} />
                            )
                        })
                        : isCommentsShown && <Text
                            style={{
                            color: '#fff',
                            marginLeft: 20
                        }}>There is no comments yet. You can add first!!!</Text> 

}
                <View>
                    <TextInput
                        style={styles.commentInput}
                        multiline={true}
                        placeholder='Text here...'
                        value={commentText}
                        onChangeText={setCommentText}/>
                    <TouchableOpacity
                        style={styles.sendCommentBtn}
                        onPress={addNewComment.bind(null, post._id)}>
                        <MaterialCommunityIcons name="telegram" size={30} color="white"/>
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
        borderBottomLeftRadius: 10
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
    refreshBtn: {
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
        width: 30
    },
    soundBtn: {
        position: 'absolute',
        left: 20,
        top: 10
    }
});