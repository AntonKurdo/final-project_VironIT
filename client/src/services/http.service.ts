import {Alert} from 'react-native';

interface iData {
    email : string,
    password : string
};

class Http {
    private URL = 'http://192.168.100.2:5000';

    signUp = async(data : iData) => {
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
        } else {
            Alert.alert('Error', 'Something went wrong...')
        }
    }

}

export default new Http();