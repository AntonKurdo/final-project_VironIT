import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

// SCREENS
import ArchivedChatsScreen from './../screens/ArchivedChats.screen';
import AllChatsScreen from './../screens/AllChats.screen';

import { THEME } from './../../theme';
import { useAppContext } from '../context/context';
import { useQuery } from '@apollo/client';
import { GET_PERSONAL_CHATS_QUERY } from '../appollo/queries/getPersonalChats';
import { GET_GROUP_CHATS_QUERY } from '../appollo/queries/getGroupChats';
import { GET_ALL_ARCHIVED_CHATS_QUERY } from '../appollo/queries/getArchivedChats';


const Tab = createBottomTabNavigator();

function ChatsTabNav() {
  const { activeUserInfo } = useAppContext();

  const {data: personalChatsGQL, loading, refetch: refetchPersonalChats} = useQuery(GET_PERSONAL_CHATS_QUERY, {
    variables: {
      userId: activeUserInfo.id
    }
  });
  
  const {data: groupChatsGQL, refetch: refetchArchivedChats } = useQuery(GET_GROUP_CHATS_QUERY, {
    variables: {
      userId: activeUserInfo.id
    }
  });

  const {data: archivedChatsGQL, loading: archivedChatsLoading} = useQuery(GET_ALL_ARCHIVED_CHATS_QUERY, {        
    variables: {
        userId: activeUserInfo.id
    }
});

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
        children={() => <AllChatsScreen personalChatsGQL={personalChatsGQL}  groupChatsGQL={groupChatsGQL}  refetchPersonalChats={refetchPersonalChats} refetchArchivedChats={refetchArchivedChats}/>}
        options={{                     
          tabBarIcon: ({color}) => (        
           <Entypo name="message" size={30} color={color} />
          )                  
        }}
      />   
      <Tab.Screen 
        name="Archived"         
        children={() => <ArchivedChatsScreen archivedChatsGQL={archivedChatsGQL} loading={archivedChatsLoading} refetchPersonalChats={refetchPersonalChats}  refetchArchivedChats={refetchArchivedChats}  />}
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