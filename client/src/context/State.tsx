import React, {FC,useReducer} from 'react';
import Context, { iUserData, iUser } from './context';
import {reducer} from './reducer';
import { CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS, GET_USER_POSTS, SET_ACTIVE_USER_INFO, LIKE_POST_BY_ID, SET_ALL_USERS, CLEAR_ALL_USERS, SET_USER_FRIENDS, ADD_FRIEND, SET_NEWS, CLEAR_NEWS, CHANGE_AVATAR } from './types';
import { iPost } from './../components/Post.component';

export const AppState: FC = ({children}) => {

  const INITIAL_STATE = {   
     activeUserInfo: {
       id: '',
       email: '',
       firstName: '',
       lastName: '',
       avatar: ''       
     },    
     friends: [], 
     allUsers: [],
     userPosts: [] ,
     news: []  
  };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
 
    const getUserPosts = (posts: Array<iPost>) => dispatch({type: GET_USER_POSTS, posts}); 
    const clearUserPosts = () => dispatch({type: CLEAR_USER_POSTS}); 
    const setActiveUserInfo = (data: iUserData) => dispatch({type: SET_ACTIVE_USER_INFO, data});
    const clearActiveUserInfo = () => dispatch({type: CLEAR_ACTIVE_USER_INFO});
    const likePostById = (id: string) => dispatch({type: LIKE_POST_BY_ID, id});
    const setAllUsers = (allUsers: Array<iUser>) => dispatch({type: SET_ALL_USERS, allUsers});    
    const clearAllUsers = () => dispatch({type: CLEAR_ALL_USERS});
    const setUserFriends = (friends: Array<iUser>) => dispatch({type: SET_USER_FRIENDS, friends});
    const addFriend = (friend: iUser) => dispatch({type: ADD_FRIEND, friend});
    const setNews = (news: Array<iPost>) => dispatch({type: SET_NEWS, news});
    const clearNews = () => dispatch({type: CLEAR_NEWS})
    const changeAvatar = (newAvatar: string) => dispatch({type: CHANGE_AVATAR, newAvatar})

    return <Context.Provider
        value={{
          activeUserInfo: state.activeUserInfo,
          posts: state.userPosts,
          allUsers: state.allUsers,
          friends: state.friends,
          news: state.news,
          setActiveUserInfo,
          getUserPosts,
          clearActiveUserInfo,
          clearUserPosts,
          likePostById,
          setAllUsers,
          clearAllUsers,
          setUserFriends,
          addFriend,
          setNews,
          clearNews,
          changeAvatar   
    }}>{children}</Context.Provider>
};