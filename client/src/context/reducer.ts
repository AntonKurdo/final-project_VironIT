import { SET_ACTIVE_USER_INFO, GET_USER_POSTS, CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS, LIKE_POST_BY_ID, SET_ALL_USERS, CLEAR_ALL_USERS, SET_USER_FRIENDS, ADD_FRIEND, SET_NEWS, CLEAR_NEWS } from "./types";
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

    case SET_ALL_USERS: 
      const UserWithoutActiveUser = action.allUsers.filter((user: any) => user.firstName + user.lastName !== state.activeUserInfo.firstName + state.activeUserInfo.lastName);
      return {...state, allUsers: UserWithoutActiveUser}

    case CLEAR_ALL_USERS: 
      return {...state, allUser: []}

    case SET_USER_FRIENDS: 
      return {...state, friends: action.friends}
    
    case ADD_FRIEND: 
      return {...state, friends: [...state.friends, action.friend]}

    case SET_NEWS: 
      return {...state, news: action.news}

    case CLEAR_NEWS: 
      return {...state, news: []}
    default: 
      return state;
  }
}
