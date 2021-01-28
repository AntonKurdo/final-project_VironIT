import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {THEME} from './../../theme';
import {NavigationContainer} from '@react-navigation/native';
// SCREENS
import StartingScreen from '../screens/Starting.screen';
import SignUpScreen from './../screens/SingUp.screen';
import LoginScreen from '../screens/LogIn.screen';
import MyPosts from './../screens/MyPosts.screen';

import ProfileTabNav from './Profile.nav';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CreatePostScreen from './../screens/CreatePost.screen';

const routesStyling = {
    headerStyle: {
        backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
};

const Stack = createStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={StartingScreen} options={routesStyling}/>
                <Stack.Screen name="Sign Up" component={SignUpScreen} options={routesStyling}/>
                <Stack.Screen name="Login" component={LoginScreen} options={routesStyling}/>
                <Stack.Screen
                    name="Profile"
                    component={ProfileTabNav}
                    options={({navigation}) => {
                    return ({
                        headerShown: false,
                        ...routesStyling,
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                                <Ionicons
                                    name="md-settings"
                                    size={25}
                                    color='#fff'
                                    style={{
                                    marginRight: 25
                                }}/>
                            </TouchableOpacity>
                        )
                    })
                }}/>
                <Stack.Screen
                    name="Posts"
                    component={MyPosts}
                    options={({navigation}) => ({
                    ...routesStyling,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Create New Post')}>
                            <Entypo
                                name="add-to-list"
                                size={25}
                                color='#fff'
                                style={{
                                marginRight: 25
                            }}/>
                        </TouchableOpacity>
                    )
                })}/>
                <Stack.Screen
                    name="Create New Post"
                    component={CreatePostScreen}
                    options={routesStyling}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;