import {Alert} from 'react-native';
import {getTokenInfo, storeTokenInfo} from './asyncStorage.service';
import * as Google from 'expo-google-app-auth';
import {iUserData} from '../context/context';

interface iData {   
    email : string,
    password : string
};

interface iNewPost {
    title : string,
    owner : string,
    text : string,
    picture?: string,
    video?: string
}

class Http {
    private URL = 'http://192.168.100.2:5000';

    signUp = async(data : iData) : Promise < boolean > => {
        const res = await fetch(`${this.URL}/auth`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            const json = await res.json();
            Alert.alert('Message', json.message);
            if (json.message === 'User has been created...') {
                return true
            }
            return false
        } else {
            Alert.alert('Error', 'Something went wrong... Server is not answering!!!');
            return false;
        }
    }

    logIn = async(data : iData) : Promise < boolean | iUserData > => {
        const res = await fetch(`${this.URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                ...data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await res.json();
        if (json.message) {
            Alert.alert('Error', json.message)
            return false;
        }      
        storeTokenInfo({
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
            userId: json.userId
        });
        return {firstName: json.firstName, lastName: json.lastName, email: json.email, avatar: json.avatar, id: json.userId};
    }

    signUpWithGoogle = async() : Promise < boolean | iUserData | undefined > => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '632259900656-kbrjfnl7magoi8r7c216fst9iitnpbrb.apps.googleusercontent.com',
                iosClientId: '632259900656-3k3km1j7r826meo0hb8mdtpbpurukke6.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });
            if (result.type === 'success') {
                const res = await fetch(`${this.URL}/auth/google`, {
                    method: 'POST',
                    body: JSON.stringify({email: result.user.email}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await res.json();
                if (json.message) {
                    Alert.alert('Error', json.message)
                    return false;
                }
                storeTokenInfo({
                    accessToken: json.accessToken,
                    refreshToken: json.refreshToken,
                    userId: json.userId
                });
                return {firstName: json.firstName, lastName: json.lastName, avatar: json.avatar, email: json.email, id: json.userId};
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
        }
    }

    getAllUserPostsById = async(id : string) => {
        try{
            const tokenInfo = getTokenInfo && await getTokenInfo();            
            if(tokenInfo && typeof tokenInfo !== 'boolean') {
                const res = await fetch(`${this.URL}/posts/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${tokenInfo.accessToken}`
                    }
                });                  
                    const json = await res.json();
                    if(json.message) {
                       Alert.alert('Error', 'You can not get post, You have no authorization!!!')
                       return [];
                    }
                    return json;   
            }          
        } catch(e) {
            console.log(e)
        }
    }

    addNewPost = async(post : iNewPost): Promise<boolean> => {
        try {
            const tokenInfo = getTokenInfo && await getTokenInfo();
           
            if(tokenInfo && typeof tokenInfo !== 'boolean') {
                const res = await fetch(`${this.URL}/posts`, {
                    method: 'POST',
                    body: JSON.stringify(post),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenInfo.accessToken}`
                    }
                });
               const json = await res.json();          
               if(json.message !== 'post created') {
                  Alert.alert('Error', 'You can not create a new post. You have no authorization!!!')
                  return false;
               } else {
                   return true;
               }
            }
            Alert.alert('Error', 'You can not create new post. You have no authorization!!!')
            return false;          
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    likePostById = async(postId: string, userId: string): Promise<boolean> => {
      try{
        const tokenInfo = getTokenInfo && await getTokenInfo();
        if(tokenInfo && typeof tokenInfo !== 'boolean') {
            const res = await fetch(`${this.URL}/posts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenInfo.accessToken}`
            },
            body: JSON.stringify({postId, userId})
            });
            const json = await res.json();
            if(json.message !== 'Ok') {
                Alert.alert('Error', json.message)
                return false;
            } else {
                return true;
            }           
        } else {
            return false;
        }
      } catch(e) {
        return false
      }
    }

    getAllUsers = async () => {
        try {
            const tokenInfo = getTokenInfo && await getTokenInfo();            
            if(tokenInfo && typeof tokenInfo !== 'boolean') {
                const res = await fetch(`${this.URL}/friends/allUsers`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${tokenInfo.accessToken}`
                    }
                });                  
                    const json = await res.json();
                    if(json.message) {
                       Alert.alert('Error', 'You have no authorization!!!')
                       return [];
                    }                  
                    return json;   
            }          
        } catch(e) {
            console.log(e);   
            return [];         
        }
    }

    getAllFriendsById = async (id: string) => {
        try {
            const tokenInfo = getTokenInfo && await getTokenInfo();            
            if(tokenInfo && typeof tokenInfo !== 'boolean') {
                const res = await fetch(`${this.URL}/friends/allFriends/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${tokenInfo.accessToken}`                      
                    }                    
                });                  
                    const json = await res.json();
                    return json;
            }          
        } catch(e) {
            console.log(e);                
        }
    }

    addFriend = async (userId: string, newFriendId: string) => {
        try {
            const tokenInfo = getTokenInfo && await getTokenInfo();            
            if(tokenInfo && typeof tokenInfo !== 'boolean') {
                const res = await fetch(`${this.URL}/friends/addFriend`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${tokenInfo.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userId, newFriendId})
                });                  
                    const json = await res.json();
                    if(json.message === 'New friend was added...') {   
                        Alert.alert('Attention!!!', json.message)                     
                        return true;
                    }
                    Alert.alert('Attention!!!', json.message)
                    return false;                  
            }    
            return false     
        } catch(e) {
            console.log(e);                
        }
    }

    getNews = async (id: string) => {
        try {
            const tokenInfo = getTokenInfo && await getTokenInfo();            
            if(tokenInfo && typeof tokenInfo !== 'boolean') {
                const res = await fetch(`${this.URL}/posts/news/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${tokenInfo.accessToken}`                        
                    }                   
                });                  
                    const json = await res.json();
                    return json;                            
            }          
        } catch(e) {
            console.log(e);                
        }
    }
}

export default new Http();