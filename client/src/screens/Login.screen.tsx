import React, {FC, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    Keyboard      
} from 'react-native';
import {MaterialIcons, Entypo} from '@expo/vector-icons';
import httpService from '../services/http.service';
import {useNavigation} from '@react-navigation/native';
import {THEME} from './../../theme';
import {useAppContext} from '../context/context';
import { socket } from './CurrentChat.screen';
import firebase from 'firebase';


const LoginScreen : FC = () => {

    const [secure, setSecure] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const navigation = useNavigation();
    const {setActiveUserInfo, getUserPosts, setAllUsers, setUserFriends, setNews, isLoading, setIsLoadingTrue, setIsLoadingFalse, setUserGroupChat, setUserPersonalChat, setUserArchivedChat} = useAppContext();

    const login = async () => {
        Keyboard.dismiss();
        setIsLoadingTrue!();
        const result = await httpService.logIn({email, password});
        setEmail('');
        setPassword('');
        if (typeof result !== 'boolean' && setActiveUserInfo) {
            await setActiveUserInfo(result);
            const posts = await httpService.getAllUserPostsById(result.id);
            getUserPosts && getUserPosts(posts);
            setAllUsers!(await httpService.getAllUsers());                       
            setUserFriends!(await httpService.getAllFriendsById(result.id)); 
            setNews!(await httpService.getNews(result.id)); 
            setUserPersonalChat!(await httpService.getAllChatsById(result.id));
            setUserGroupChat!(await httpService.getGroupChatsById(result.id));
            setUserArchivedChat!(await httpService.getAllArchivedChatsById(result.id));
            navigation.navigate('Profile');       
            socket.connect();     
            firebase
                .database()
                .ref('authorizationedUsers/' + result.id  )
                .set({
                    email: result.email,
                    lastVisitTime: Date.now()
                });               
        } else {
            setIsLoadingFalse!();
        }
    }

    const googleLog = async() => {
      setIsLoadingTrue!();
      const result = await httpService.signUpWithGoogle();
      if (typeof result !== 'boolean' && setActiveUserInfo && result) {
          await setActiveUserInfo(result);
          const posts = await httpService.getAllUserPostsById(result.id);
          getUserPosts && getUserPosts(posts);
          setAllUsers && setAllUsers(await httpService.getAllUsers());
          setUserFriends!(await httpService.getAllFriendsById(result.id)); 
          setNews!(await httpService.getNews(result.id));
          setUserPersonalChat!(await httpService.getAllChatsById(result.id));
          setUserGroupChat!(await httpService.getGroupChatsById(result.id));
          setUserArchivedChat!(await httpService.getAllArchivedChatsById(result.id));
          navigation.navigate('Profile'); 
          socket.connect();  
          firebase
            .database()
            .ref('authorizationedUsers/' + result.id  )
            .set({
                email: result.email,
                lastVisitTime: Date.now()
            });                          
      } else {
          setIsLoadingFalse!();
      }
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={THEME.MAIN_COLOR}/>
            </View>
        )
    };

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <TextInput
                    placeholderTextColor={THEME.MAIN_COLOR}
                    placeholder='E-mail'
                    style={{
                    ...styles.input,
                    marginBottom: 30
                }}
                    value={email}
                    onChangeText={em => setEmail(em.trim())}/>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={() => {                        
                        Keyboard.dismiss();
                        setSecure(!secure);
                    }}>
                        {secure
                            ? <MaterialIcons name="visibility-off" size={28} color={THEME.MAIN_COLOR}/>
                            : <MaterialIcons name="visibility" size={28} color={THEME.MAIN_COLOR}/>}
                    </TouchableOpacity>
                    <TextInput
                        placeholderTextColor={THEME.MAIN_COLOR}
                        secureTextEntry={secure}
                        placeholder='Password'
                        style={styles.input}
                        value={password}
                        onChangeText={pass => setPassword(pass.trim())}/>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={login}>
                    <Text style={styles.btnText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.underBtn} activeOpacity={.9}>
                    <Text style={styles.underText}>
                        New here? 
                        <Text
                            onPress={() => navigation.navigate('Sign Up')}
                            style={{
                            ...styles.underText,
                            textDecorationLine: "underline",
                            textDecorationStyle: "solid"
                        }}> Sign Up instead</Text>
                    </Text>
                </TouchableOpacity>    
                <Text style={styles.or}>
                    or
                </Text>
                <TouchableOpacity style={styles.googleBtnCont} onPress= {googleLog}>
                    <Text style={styles.googleSign}>
                        Log In with Google</Text>
                    <View
                        style={styles.googleBtn}                       
                    >
                        <Image
                            style={{
                            width: 50,
                            height: 50
                        }}
                            source={require('../../assets/googleIcon.png')}/>
                    </View>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        paddingTop: '50%'        
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        color: THEME.MAIN_COLOR,
        fontSize: 30,
        position: 'absolute',
        top: 100,
        left: 30,
        fontWeight: 'bold'
    },
    input: {
        alignSelf: 'center',
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: THEME.INPUT_WIDTH,
        fontSize: 18,
        padding: 7,
        color: THEME.MAIN_COLOR
    },
    icon: {
        width: 30,
        position: 'absolute',
        right: 45,
        bottom: 5,
        zIndex: 2
    },
    btn: {
        marginTop: 50,
        alignSelf: 'center',
        width: THEME.BTN_WIDTH,
        height: THEME.BTN_HEIGHT,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_COLOR
    },
    btnText: {
        fontSize: 20,
        color: '#fff'
    },
    underBtn: {
      marginTop: 20,      
      alignSelf: 'center'
    },
    underText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: THEME.MAIN_COLOR
    },
    or: {
        alignSelf: 'center',
        marginVertical: 15,
        fontSize: 20,
        color: THEME.MAIN_COLOR
    },
    googleBtnCont: {
        borderWidth: 1.5,
        paddingHorizontal: 30,
        paddingVertical: 3,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 10,
        marginBottom: 20
    },
    googleSign: {
        fontSize: 12,
        color: THEME.MAIN_COLOR,
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    },
    googleBtn: {
        alignSelf: 'center',
        borderColor: THEME.MAIN_COLOR
    }    

});

export default LoginScreen;