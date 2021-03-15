import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';

import {useAppContext} from './../context/context';
import {UserArchivedChatsComponent} from '../components/UserArchivedChats.component';

const ArchivedChatsScreen = () => {

    const {userArchivedChats} = useAppContext();   

    return (
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Archived chats
                </Text>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                {userArchivedChats
                    ?.length === 0
                        ? (
                            <View style={styles.emptyCont}>
                                <Text style={styles.emptyText}>You have no any archived chats...</Text>
                            </View>
                        )
                        : userArchivedChats !.map((chat : any) => {
                            return (<UserArchivedChatsComponent chat={chat} key={chat.id}/>)
                        })
}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: 'gray'
    },
    chatsWrapper: {
        paddingVertical: 10
    },
    emptyCont: {
        height: Dimensions
            .get('screen')
            .height * 0.6,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: 'lightgray',
        fontSize: 20
    }
})

export default ArchivedChatsScreen