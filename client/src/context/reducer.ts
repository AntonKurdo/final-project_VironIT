import { SET_ACTIVE_USER_INFO, GET_USER_POSTS, CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS } from "./types";

export const reducer = (state: any, action: any) => {
  switch(action.type) {
    case SET_ACTIVE_USER_INFO: 
      return {...state, activeUserInfo: action.data}  
    case CLEAR_ACTIVE_USER_INFO: 
      return {...state, activeUserInfo: {id: '', email: ''}}  
    case GET_USER_POSTS: 
      return {...state, userPosts: action.posts}
    case CLEAR_USER_POSTS: 
      return {...state, userPosts: []}     
    default: 
      return state;
  }
}
