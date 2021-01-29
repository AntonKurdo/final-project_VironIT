import {Alert} from 'react-native';
import {storeTokenInfo} from './asyncStorage.service';
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
            body: JSON.stringify({
                ...data
            }),
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
        // storeTokenInfo(json);
        return {email: json.email, id: json.userId};
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

                return {email: json.email, id: json._id};
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
        }
    }

    getAllUserPostsById = async(id : string) => {
        const res = await fetch(`${this.URL}/posts/${id}`);
        const posts = await res.json();
        return posts;
    }

    addNewPost = async(post : iNewPost) : Promise < boolean > => {
        try {
            const res = await fetch(`${this.URL}/posts`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            if (res) {
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    likePostById = async(id: string): Promise<boolean> => {
      try{
        await fetch(`${this.URL}/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: null
        });
        return true
      } catch(e) {
        return false
      }
    }
}

export default new Http();