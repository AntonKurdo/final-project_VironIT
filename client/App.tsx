import React, {FC, useEffect} from 'react';
import MainNavigator from './src/navigation/Main.nav';
import {AppState} from './src/context/State';
import { MenuProvider } from 'react-native-popup-menu';
import firebase from "firebase";
import { firebaseConfig } from './firebaseConfig';


const App: FC = () => {
    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }      
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
