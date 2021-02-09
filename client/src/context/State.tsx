import React, {FC,useReducer} from 'react';
import Context, { iUserData, iUser } from './context';
import {reducer} from './reducer';
import { CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS, GET_USER_POSTS, SET_ACTIVE_USER_INFO, LIKE_POST_BY_ID, SET_ALL_USERS, CLEAR_ALL_USERS, SET_USER_FRIENDS, ADD_FRIEND, SET_NEWS, CLEAR_NEWS, CHANGE_AVATAR, SET_IS_LOADING_TRUE, SET_IS_LOADING_FALSE, OPEN_MODAL, CLOSE_MODAL, SET_USER_GROUP_CHATS, CLEAR_USER_GROUP_CHATS, LEFT_GROUP_CHAT, REMOVE_FRIEND, CLEAR_USER_PERSONAL_CHATS, SET_USER_PERSONAL_CHATS, SET_USER_ARCHIVED_CHATS, CLEAR_USER_ARCHIVED_CHATS, ARCHIVE_CHAT, UNARCHIVE_CHAT } from './types';
import { iPost } from './../components/Post.component';
import { iMember } from './../components/AddNewGroupChatModal';

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
     userPosts: [],
     userGroupChats: [],
     userPersonalChats: [],
     userArchivedChats: [],
     news: [],
     isLoading: false,
     isModalOpen: false  
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
    const removeFriend = (friendId: string) => dispatch({type: REMOVE_FRIEND, friendId});
    const setNews = (news: Array<iPost>) => dispatch({type: SET_NEWS, news});
    const clearNews = () => dispatch({type: CLEAR_NEWS})
    const changeAvatar = (newAvatar: string) => dispatch({type: CHANGE_AVATAR, newAvatar})
    const setIsLoadingTrue = () => dispatch({type: SET_IS_LOADING_TRUE})
    const setIsLoadingFalse = () => dispatch({type: SET_IS_LOADING_FALSE})
    const openModal = () => dispatch({type: OPEN_MODAL});
    const closeModal = () => dispatch({type: CLOSE_MODAL});
    const setUserGroupChat = (groupChats: Array<any>) => dispatch({type: SET_USER_GROUP_CHATS, groupChats});
    const clearUserGroupChat = () => dispatch({type: CLEAR_USER_GROUP_CHATS});
    const leftChat = (chatId: string) => dispatch({type: LEFT_GROUP_CHAT, chatId});
    const setUserPersonalChat = (personalChats: Array<any>) => dispatch({type: SET_USER_PERSONAL_CHATS, personalChats});
    const clearUserPersonalChat = () => dispatch({type: CLEAR_USER_PERSONAL_CHATS});
    const setUserArchivedChat = (archivedChats: Array<any>) => dispatch({type: SET_USER_ARCHIVED_CHATS, archivedChats});
    const clearUserArchivedChat = () => dispatch({type: CLEAR_USER_ARCHIVED_CHATS});
    const archiveChat = (chat: any) => dispatch({type: ARCHIVE_CHAT, chat});
    const unarchiveChat = (chat: any) => dispatch({type: UNARCHIVE_CHAT, chat});

    return <Context.Provider
        value={{
          activeUserInfo: state.activeUserInfo,
          posts: state.userPosts,
          allUsers: state.allUsers,
          friends: state.friends,
          news: state.news,
          isLoading: state.isLoading,
          isModalOpen: state.isModalOpen,
          userGroupChats: state.userGroupChats,
          userPersonalChats: state.userPersonalChats,
          userArchivedChats: state.userArchivedChats,
          setActiveUserInfo,
          getUserPosts,
          clearActiveUserInfo,
          clearUserPosts,
          likePostById,
          setAllUsers,
          clearAllUsers,
          setUserFriends,
          addFriend,
          removeFriend,
          setNews,
          clearNews,
          changeAvatar,
          setIsLoadingTrue,
          setIsLoadingFalse,
          openModal,
          closeModal,
          setUserGroupChat,
          clearUserGroupChat,
          leftChat,
          setUserPersonalChat,
          clearUserPersonalChat,
          setUserArchivedChat,
          clearUserArchivedChat,
          archiveChat,
          unarchiveChat
    }}>{children}</Context.Provider>
};