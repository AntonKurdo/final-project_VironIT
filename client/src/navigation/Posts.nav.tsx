import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import {THEME} from './../../theme';


import MyPosts from './../screens/MyPosts.screen';
import CreatePostScreen from './../screens/CreatePost.screen';
import { TouchableOpacity } from 'react-native';

const routesStyling = {  
  headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
  },
  headerTintColor: '#fff'
};

const Stack = createStackNavigator();

function PostNavigator() {  
  return (
    <Stack.Navigator>
         <Stack.Screen 
          name="Posts" 
          component={MyPosts} 
          options={({navigation}) => ({
            ...routesStyling,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Create New Post') }>
                 <Entypo name="add-to-list" size={25} color='#fff' style={{marginRight: 25}} />
              </TouchableOpacity>
            )
          })}/>
         <Stack.Screen name="Create New Post" component={CreatePostScreen} options={routesStyling}/>
    </Stack.Navigator>
 
  )
}

export default PostNavigator;