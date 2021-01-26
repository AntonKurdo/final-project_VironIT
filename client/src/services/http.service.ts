import {Alert} from 'react-native';
import { storeTokenInfo } from './asyncStorage.service';

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
}

export default new Http();