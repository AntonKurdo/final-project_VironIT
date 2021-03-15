import React, {FC, useEffect, useRef} from 'react';
import { LogBox, Platform } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import MainNavigator from './src/navigation/Main.nav';
import {AppState} from './src/context/State';
import { MenuProvider } from 'react-native-popup-menu';
import firebase from "firebase";
import { firebaseConfig } from './firebaseConfig';
import { regusterForPushNotifications } from './src/services/getNotificationsPermission.service';

Platform.OS === 'android' && LogBox.ignoreLogs(['Setting a timer']);

const cache = new InMemoryCache({
  typePolicies: {
    Mutation: {
      fields: {
        friends: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          }
        },
        comments: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          }
        },
        posts: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          }
        }
      }
    }  
  }
});

const client = new ApolloClient({
    uri: 'http://192.168.100.6:5000/graphql',  
    cache
  });

const App: FC = () => {  

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }     
        regusterForPushNotifications();          
    }, []) 

   return (
     <ApolloProvider client={client}>
        <AppState >
            <MenuProvider>
                <MainNavigator/>
            </MenuProvider>           
        </AppState>
     </ApolloProvider>
    );
};

export default App;
