import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PostNavigator from './Posts.nav';
import { MaterialCommunityIcons, Entypo, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import { THEME } from './../../theme';
import FriendsScreen from '../screens/Friends.screen';
import NewsScreen from '../screens/News.screen';
import ChatsTabNav from './Chats.tab.nav';
import ProfileScreen from './../screens/Profile.screen';

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
              component={ProfileScreen}
              options={{
                drawerIcon: (props) => <MaterialCommunityIcons name="human-greeting" size={24} color={props.color} />
              }}
            />
            <Drawer.Screen 
              name="News" 
              component={NewsScreen}
              options={{
                drawerIcon: (props) => <Entypo name="news" size={24} color={props.color} />
              }}
            />
            <Drawer.Screen 
              name="Chats" 
              component={ChatsTabNav}
              options={{
                drawerIcon: (props) => <MaterialIcons name="message" size={24} color={props.color} />
              }}
            />
            <Drawer.Screen 
              name="My Posts" 
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