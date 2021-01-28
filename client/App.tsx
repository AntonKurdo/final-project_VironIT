import React, {FC} from 'react';
import MainNavigator from './src/navigation/Main.nav';
import {AppState} from './src/context/State'

const App: FC = () => {
    return (
        <AppState >
            <MainNavigator/>
        </AppState>
    );
};

export default App;
