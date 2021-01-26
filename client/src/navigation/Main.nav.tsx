import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {THEME} from './../../theme';

// SCREENS
import StartingScreen from '../screens/Starting.screen';
import SignUpScreen from './../screens/SingUp.screen';
import LoginScreen from '../screens/LogIn.screen';

import ProfileTabNav from './Profile.nav';

const routesStyling = {  
    headerStyle: {
        backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
};

const Stack = createStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator>           
            <Stack.Screen name="Home" component={StartingScreen} options={routesStyling}/>
            <Stack.Screen name="Sign Up" component={SignUpScreen} options={routesStyling}/>
            <Stack.Screen name="Login" component={LoginScreen} options={routesStyling}/>
            <Stack.Screen name="Profile" component={ProfileTabNav} options={routesStyling}/>
        </Stack.Navigator>
    );
}

export default MainNavigator;