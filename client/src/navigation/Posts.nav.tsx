import React from 'react';


import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {THEME} from './../../theme';


import MyPosts from './../screens/MyPosts.screen';
import CreatePostScreen from './../screens/CreatePost.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const routesStyling = {  
  headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
  },
  headerTintColor: '#fff'
};


const Tab = createBottomTabNavigator();

function PostNavigator() {  
  return (
    <Tab.Navigator
    tabBarOptions = {
      {
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {fontSize: 14, fontWeight: 'bold'}        
      }
    }>
         <Tab.Screen 
          name="My Posts" 
          component={MyPosts} 
          options={{                     
            tabBarIcon: ({color}) => (        
             <MaterialCommunityIcons name="postage-stamp" size={30} color={color} />
            )                  
          }}
        />
         <Tab.Screen 
          name="New Post" 
          component={CreatePostScreen} 
          options={{                     
            tabBarIcon: ({color}) => (        
             <Ionicons name="create" size={30} color={color} />
            )                  
          }}
          />
    </Tab.Navigator>
 
  )
}

export default PostNavigator;