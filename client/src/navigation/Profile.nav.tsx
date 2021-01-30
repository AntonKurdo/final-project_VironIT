import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';

// SCREENS
import ProfileScreen from '../screens/Profile.screen';
import SettingsScreen from './../screens/Settings.screen';

import { THEME } from './../../theme';

const Tab = createBottomTabNavigator();

function ProfileTabNav() {

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
        name="Profile" 
        component={ProfileScreen} 
        options={{                     
          tabBarIcon: ({color}) => (        
           <AntDesign name="profile" size={30} color={color} />
          )                  
        }}
      />   
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{                     
          tabBarIcon: ({color}) => (        
            <Ionicons name="md-settings" size={30} color={color} />
          )                  
        }}
      />
   
    </Tab.Navigator>
  );
};

export default ProfileTabNav;