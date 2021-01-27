import {Alert, Linking} from 'react-native';
import { storeTokenInfo } from './asyncStorage.service';
import * as Google from 'expo-google-app-auth';


interface iData {
    email : string,
    password : string
};

class Http {
    private URL = 'http://192.168.100.2:5000';

    signUp = async(data : iData): Promise<boolean> => {
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

    logIn = async (data: iData): Promise<boolean> => {
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
      if(json.message) {
        Alert.alert('Error', json.message)
        return false;
      } 
      // storeTokenInfo(json);
      return true;  
    }  

    signUpWithGoogle = async (): Promise<boolean | undefined> => {
        try {
            const result = await Google.logInAsync({
              androidClientId: '632259900656-kbrjfnl7magoi8r7c216fst9iitnpbrb.apps.googleusercontent.com',     
              iosClientId: '632259900656-3k3km1j7r826meo0hb8mdtpbpurukke6.apps.googleusercontent.com' ,   
              scopes: ['profile', 'email'],
            });        
            if (result.type === 'success') {
              const res = await fetch(`${this.URL}/auth/google`, {
                method: 'POST',
                body: JSON.stringify({
                    email: result.user.email
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
              })   
              const json = await res.json();
              if(json.message) {
                Alert.alert('Error', json.message)
                return false;
              } 
              return true;              
            } else {              
              return false;
            }          
          } catch (e) {
            console.log(e)
          }
    }
}

export default new Http();