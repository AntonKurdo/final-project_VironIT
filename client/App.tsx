import React, {FC} from 'react';
import MainNavigator from './src/navigation/Main.nav';
import {AppState} from './src/context/State';
import { MenuProvider } from 'react-native-popup-menu';

const App: FC = () => {
    return (
        <AppState >
            <MenuProvider>
                <MainNavigator/>
            </MenuProvider>           
        </AppState>
    );
};

export default App;
