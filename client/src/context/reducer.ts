import { SET_ACTIVE_USER_INFO, GET_USER_POSTS, CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS, LIKE_POST_BY_ID } from "./types";
import { iPost } from './../components/Post.component';

export const reducer = (state: any, action: any) => {
  switch(action.type) {
    case SET_ACTIVE_USER_INFO: 
      return {...state, activeUserInfo: action.data}  
    case CLEAR_ACTIVE_USER_INFO: 
      return {...state, activeUserInfo: {id: '', email: '', firstName: '', lastName: '', avatar: ''}}  
    case GET_USER_POSTS: 
      return {...state, userPosts: action.posts}
    case CLEAR_USER_POSTS: 
      return {...state, userPosts: []}     
    case LIKE_POST_BY_ID: 
        const newPosts = state.userPosts.map((post: iPost) => {
        if(post._id === action.id && post.isFavourite) {
          post.isFavourite = false;
          post.likes = post.likes - 1
        } else if(post._id === action.id && !post.isFavourite) {
          post.isFavourite = true;
          post.likes = post.likes + 1
        } 
        return post;
      })
      return {...state, userPosts: newPosts}     
    default: 
      return state;
  }
}
