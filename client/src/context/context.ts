import { createContext, useContext } from 'react';
import { iPost } from './../components/Post.component';

export interface iUserData{
  id: string,
  email: string,
  avatar: string,
  firstName: string,
  lastName: string
}

export interface iUser {
  _id: string,
  first_name: string,
  last_name: string,
  avatar: string
}

type iContext = {
    activeUserInfo?: any
    posts?: Array<iPost>,
    allUsers?: Array<iUser>,
    friends?: Array<iUser>,
    news?: Array<iPost>,
    isLoading?: boolean,
    isModalOpen?: boolean,
    userGroupChats?: Array<any>
    userPersonalChats?: Array<any>
    userArchivedChats?: Array<any>
    isVerified?: boolean,
    setActiveUserInfo?: (userData: iUserData) => void
    getUserPosts?: (posts: Array<iPost>) => void,
    clearActiveUserInfo?: () => void,
    clearUserPosts?: () => void,
    likePostById?: (id: string) => void,
    setAllUsers?: (users: Array<iUser>) => void,
    clearAllUsers?: () => void,
    setUserFriends?: (friends: Array<iUser>) => void,
    addFriend?: (friend: iUser) => void,
    removeFriend?: (friend: string) => void,
    setNews?: (news: Array<iPost>) => void, 
    clearNews?: () => void,
    changeAvatar?: (newAvatar: string) => void,
    setIsLoadingTrue?: () => void,
    setIsLoadingFalse?: () => void,
    openModal?: () => void,
    closeModal?: () => void,
    setUserGroupChat?: (groupChats: Array<any>) => void,
    clearUserGroupChat?: () => void,
    leftChat?: (chatId: string) => void,
    setUserPersonalChat?: (personalChats: Array<any>) => void,
    clearUserPersonalChat?: () => void,
    setUserArchivedChat?: (archivedChats: Array<any>) => void,
    clearUserArchivedChat?: () => void,
    archiveChat?: (chat: any) => void, 
    unarchiveChat?: (chat: any) => void,
    setIsVerified?: () => void
};

export const useAppContext = () => useContext(AppContext); 
const AppContext =  createContext<iContext>({});
export default AppContext;