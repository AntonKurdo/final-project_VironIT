import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { Entypo, Feather } from '@expo/vector-icons';
import {THEME} from './../../theme';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';

// SCREENS
import StartingScreen from '../screens/Starting.screen';
import SignUpScreen from './../screens/SingUp.screen';
import LoginScreen from '../screens/Login.screen';
import ProfileDrawer from './Profile.drawer.nav';
import PostNavigator from './Posts.nav';
import { useAppContext } from '../context/context';
import { removeTokenInfo } from '../services/asyncStorage.service';
import CurrentChatScreen, { socket } from './../screens/CurrentChat.screen';
import CurrentGroupChatScreen from './../screens/CurrentGroupChat.screen';
import PhoneVerificationsScreen from '../screens/PhoneVerificationScreen';
import NotificationScreen from '../screens/Notification.screen';

const routesStyling = {
    headerStyle: {
        backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
};

const Stack = createStackNavigator();

function MainNavigator() {

    const {activeUserInfo, clearActiveUserInfo, clearUserPosts, clearAllUsers, clearNews, clearUserPersonalChat, clearUserArchivedChat} = useAppContext();

    const logout = (nav: any) => {
        Alert.alert(
            "Log Out",
            "Are You sure to exit?",
            [            
              { text: "OK", onPress: async () => {
                nav.navigate('Home'); 
                // clearActiveUserInfo!(); 
                clearUserPosts!();
                clearAllUsers!();
                clearNews!();
                clearUserPersonalChat!();
                clearUserArchivedChat!();
                await removeTokenInfo();     
                socket.disconnect()     
             }},
              {
                text: "Cancel",               
                style: "cancel"
              },
            ],
            { cancelable: false }
          );       
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>            
                <Stack.Screen name="Home" component={StartingScreen} options={routesStyling}/>
                <Stack.Screen name="Sign Up" component={SignUpScreen} options={routesStyling}/>
                <Stack.Screen name="Login" component={LoginScreen} options={routesStyling}/>       
                <Stack.Screen name="PhoneVerification" component={PhoneVerificationsScreen} options={routesStyling}/> 
                <Stack.Screen name="Notification" component={NotificationScreen} options={routesStyling}/>     
                <Stack.Screen 
                    name="Profile" 
                    component={ProfileDrawer} 
                    options = {({navigation}) => ({
                        title: `${activeUserInfo.firstName} ${activeUserInfo.lastName}`,
                        ...routesStyling,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                <Entypo
                                    name="menu"
                                    size={30}
                                    color='#fff'
                                    style={{
                                    marginLeft: 20
                                }}/>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => logout(navigation)}>
                                <Feather
                                    name="power"
                                    size={30}
                                    color='#fff'
                                    style={{
                                    marginRight: 20
                                }}/>
                            </TouchableOpacity>
                        )
                    })}/> 
                    <Stack.Screen name="Posts" component={PostNavigator} options={routesStyling}/>   
                    <Stack.Screen name="Current chat" component={CurrentChatScreen} options={routesStyling}/>   
                    <Stack.Screen name="Group chat" component={CurrentGroupChatScreen} options={routesStyling}/>   
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;