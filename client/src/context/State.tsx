import React, {FC,useReducer} from 'react';
import Context, { iUserData } from './context';
import {reducer} from './reducer';
import { CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS, GET_USER_POSTS, SET_ACTIVE_USER_INFO, ADD_NEW_POST } from './types';
import { iPost } from './../components/Post.component';

export const AppState: FC = ({children}) => {

  const INITIAL_STATE = {   
     activeUserInfo: {
       id: '',
       email: ''
     },
     userPosts: []   
  };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
 
    const getUserPosts = (posts: Array<iPost>) => dispatch({type: GET_USER_POSTS, posts}); 
    const clearUserPosts = () => dispatch({type: CLEAR_USER_POSTS}); 
    const setActiveUserInfo = (data: iUserData) => dispatch({type: SET_ACTIVE_USER_INFO, data});
    const clearActiveUserInfo = () => dispatch({type: CLEAR_ACTIVE_USER_INFO});
  
    return <Context.Provider
        value={{
          activeUserInfo: state.activeUserInfo,
          posts: state.userPosts,
          setActiveUserInfo,
          getUserPosts,
          clearActiveUserInfo,
          clearUserPosts         
    }}>{children}</Context.Provider>
};