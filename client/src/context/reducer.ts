import { SET_ACTIVE_USER_INFO, GET_USER_POSTS, CLEAR_ACTIVE_USER_INFO, CLEAR_USER_POSTS, LIKE_POST_BY_ID, SET_ALL_USERS, CLEAR_ALL_USERS, SET_USER_FRIENDS, ADD_FRIEND, SET_NEWS, CLEAR_NEWS, CHANGE_AVATAR, SET_IS_LOADING_TRUE, SET_IS_LOADING_FALSE, OPEN_MODAL, CLOSE_MODAL, SET_USER_GROUP_CHATS, CLEAR_USER_GROUP_CHATS, LEFT_GROUP_CHAT, REMOVE_FRIEND } from "./types";
import { iPost } from './../components/Post.component';
import { iUser } from "./context";

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

    case REMOVE_FRIEND:     
      return {...state, friends: state.friends.filter((fr: iUser) => fr.id !== action.friendId)}

    case SET_NEWS: 
      return {...state, news: action.news}

    case CLEAR_NEWS: 
      return {...state, news: []}

    case CHANGE_AVATAR: 
      return {...state, activeUserInfo: {...state.activeUserInfo, avatar: action.newAvatar}} 

    case SET_IS_LOADING_TRUE: 
      return {...state, isLoading: true}   

    case SET_IS_LOADING_FALSE: 
      return {...state, isLoading: false}    
    
    case OPEN_MODAL: 
      return {...state, isModalOpen: true}  

    case CLOSE_MODAL: 
      return {...state, isModalOpen: false}  

    case SET_USER_GROUP_CHATS:
      return {...state, userGroupChats: action.groupChats}    

    case CLEAR_USER_GROUP_CHATS:
      return {...state, userGroupChats: []}     
     
    case LEFT_GROUP_CHAT: 
      return {...state, userGroupChats: state.userGroupChats.filter((chat: any) => chat._id !== action.chatId)} 

    default: 
      return state;
  }
}
