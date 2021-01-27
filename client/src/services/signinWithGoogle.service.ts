import * as Google from 'expo-google-app-auth';

export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: '632259900656-kbrjfnl7magoi8r7c216fst9iitnpbrb.apps.googleusercontent.com',     
      iosClientId: '632259900656-3k3km1j7r826meo0hb8mdtpbpurukke6.apps.googleusercontent.com' ,   
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result)
      return result.accessToken;
    } else {
      console.log('canceled')
    }
  } catch (e) {
    console.log(e)
  }
}