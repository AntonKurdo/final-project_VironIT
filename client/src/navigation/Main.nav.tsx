import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {THEME} from './../../theme';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
// SCREENS
import StartingScreen from '../screens/Starting.screen';
import SignUpScreen from './../screens/SingUp.screen';
import LoginScreen from '../screens/LogIn.screen';
import MyPosts from './../screens/MyPosts.screen';


import {TouchableOpacity} from 'react-native-gesture-handler';
import CreatePostScreen from './../screens/CreatePost.screen';
import ProfileDrawer from './Profile.drawer.nav';
import PostNavigator from './Posts.nav';

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
                    component={ProfileDrawer} 
                    options = {({navigation}) => ({
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
                        )
                    })}/> 
                    <Stack.Screen name="Posts" component={PostNavigator} options={routesStyling}/>   
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;