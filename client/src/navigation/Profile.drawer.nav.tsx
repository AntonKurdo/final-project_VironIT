import React from 'react';
import {Text} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileTabNav from './Profile.nav';
import PostNavigator from './Posts.nav';
import { MaterialCommunityIcons, Ionicons, FontAwesome5} from '@expo/vector-icons';
import { THEME } from './../../theme';
import FriendsScreen from '../screens/Friends.screen';
const Drawer = createDrawerNavigator();

function ProfileDrawer() {
    return (
        <Drawer.Navigator
            drawerContentOptions={{     
              activeBackgroundColor: THEME.MAIN_COLOR,
              activeTintColor: '#fff'              
            }}            
        >
            <Drawer.Screen 
              name="Profile" 
              component={ProfileTabNav}
              options={{
                drawerIcon: (props) => <MaterialCommunityIcons name="human-greeting" size={24} color={props.color} />
              }}
            />
            <Drawer.Screen 
              name="Posts" 
              component={PostNavigator}
              options={{
                drawerIcon: (props) => <MaterialCommunityIcons name="post" size={24} color={props.color} /> 
              }}
              />
            <Drawer.Screen 
              name="Friends" 
              component={FriendsScreen}
              options={{
                drawerIcon: (props) => <FontAwesome5 name="user-friends" size={24} color={props.color} /> 
              }}
              />
        </Drawer.Navigator>
    );
}

export default ProfileDrawer;