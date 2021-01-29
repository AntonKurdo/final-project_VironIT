import { createContext, useContext } from 'react';
import { iPost } from './../components/Post.component';

export interface iUserData{
  id: string,
  email: string
}

type iContext = {
    activeUserInfo?: any
    posts?: Array<iPost>,
    setActiveUserInfo?: (userData: iUserData) => void
    getUserPosts?: (posts: Array<iPost>) => void,
    clearActiveUserInfo?: () => void,
    clearUserPosts?: () => void,
    likePostById?: (id: string) => void
};



export const useAppContext = () => useContext(AppContext); 

const AppContext =  createContext<iContext>({});

export default AppContext;