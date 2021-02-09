import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

// SCREENS
import ArchivedChatsScreen from './../screens/ArchivedChats.screen';
import AllChatsScreen from './../screens/AllChats.screen';

import { THEME } from './../../theme';


const Tab = createBottomTabNavigator();

function ChatsTabNav() {

  return (
    <Tab.Navigator
      tabBarOptions = {
        {
          activeTintColor: THEME.MAIN_COLOR,
          labelStyle: {fontSize: 14, fontWeight: 'bold'}        
        }
      }
    >
      <Tab.Screen 
        name="Main Chats" 
        component={AllChatsScreen} 
        options={{                     
          tabBarIcon: ({color}) => (        
           <Entypo name="message" size={30} color={color} />
          )                  
        }}
      />   
      <Tab.Screen 
        name="Archived" 
        component={ArchivedChatsScreen} 
        options={{                     
          tabBarIcon: ({color}) => (        
            <Entypo name="archive" size={30} color={color} />
          )                  
        }}
      />
   
    </Tab.Navigator>
  );
};

export default ChatsTabNav;