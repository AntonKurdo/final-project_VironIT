import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import StartingScreen from '../screens/Starting.screen';
import SignUpScreen from './../screens/SingUp.screen';
import LoginScreen from './../screens/Login.screen';
import {THEME} from './../../theme';

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
        </Stack.Navigator>
    );
}

export default MainNavigator;