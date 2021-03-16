import React, {FC} from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {useAppContext} from './../context/context';
import {UserArchivedChatsComponent} from '../components/UserArchivedChats.component';
import {useQuery} from '@apollo/client';
import {GET_ALL_ARCHIVED_CHATS_QUERY} from '../appollo/queries/getArchivedChats'

interface props {
    archivedChatsGQL: any,
    loading: boolean,
    refetchPersonalChats: () => void,
    refetchArchivedChats: () => void
}

const ArchivedChatsScreen: FC<props> = ({archivedChatsGQL, loading, refetchPersonalChats, refetchArchivedChats}) => {
   
    
    if(loading) {
        return (
            <View style={styles.indicatorStyles}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Archived chats
                </Text>
            </View>
            <ScrollView style={styles.chatsWrapper}>
                {archivedChatsGQL
                    && archivedChatsGQL.chats
                    && archivedChatsGQL.chats.getArchivedChatsById.length === 0
                        ? (
                            <View style={styles.emptyCont}>
                                <Text style={styles.emptyText}>You have no any archived chats...</Text>
                            </View>
                        )
                        : archivedChatsGQL
                            && archivedChatsGQL.chats
                            && archivedChatsGQL.chats.getArchivedChatsById.map((chat : any) => {
                            return (<UserArchivedChatsComponent chat={chat} key={chat._id} refetchPersonalChats={refetchPersonalChats}  refetchArchivedChats={refetchArchivedChats} />)
                        })}
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
    },
    indicatorStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})

export default ArchivedChatsScreen