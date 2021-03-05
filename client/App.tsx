import React, {FC, useEffect} from 'react';
import { LogBox, Platform } from 'react-native';
import MainNavigator from './src/navigation/Main.nav';
import {AppState} from './src/context/State';
import { MenuProvider } from 'react-native-popup-menu';
import firebase from "firebase";
import { firebaseConfig } from './firebaseConfig';
import { regusterForPushNotifications } from './src/services/getNotificationsPermission.service';

Platform.OS === 'android' && LogBox.ignoreLogs(['Setting a timer']);

const App: FC = () => {

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }     
        regusterForPushNotifications();          
    }, []) 

    return (
        <AppState >
            <MenuProvider>
                <MainNavigator/>
            </MenuProvider>           
        </AppState>
    );
};

export default App;
