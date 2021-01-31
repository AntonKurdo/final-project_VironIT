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
      if(post._id === action.id) {        
        const isLiked = post.likes.indexOf(state.activeUserInfo.id);    
        if(isLiked === -1) {
          post.likes.push(state.activeUserInfo.id);
        } else {
          post.likes = post.likes.filter((id: string) => id !== state.activeUserInfo.id)
        }
      }      
      return post
     })   
     const newNews = state.news.map((item: any) => {     
      if(item._id === action.id) {        
        const isLiked = item.likes.indexOf(state.activeUserInfo.id);    
        if(isLiked === -1) {
          item.likes.push(state.activeUserInfo.id);
        } else {
          item.likes = item.likes.filter((id: string) => id !== state.activeUserInfo.id)
        }
      }      
      return item
     })     
    return {...state, userPosts: newPosts, news: newNews}

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
