import React, {FC, useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import httpService from '../services/http.service';
import {THEME} from './../../theme';
import { FontAwesome } from '@expo/vector-icons';

import {PhotoPicker} from './../components/PhotoPicker.component';
import {VideoPicker} from './../components/VideoPicker.component';
import { useAppContext } from '../context/context';
import { useNavigation } from '@react-navigation/native';

const CreatePostScreen : FC = () => {

    const navigation = useNavigation();
    const [title,
        setTitle] = useState('');
    const [text,
        setText] = useState('');
    const [picture,
        setPicture] = useState('');
    // const [video, setVideo] = useState('');

    const setPictureHandler = (uri : string) => {
        setPicture(uri);
    };
    const {activeUserInfo, getUserPosts} = useAppContext();

    const addNewPostHandler = async () => {
        if (text && title && picture)  {
            const isPosted = await httpService.addNewPost({title, text, picture, owner: activeUserInfo.id});
            if(isPosted) {       
                getUserPosts && getUserPosts(await httpService.getAllUserPostsById(activeUserInfo.id)) 
                Alert.alert('Success', 'Your note has been posted...');
                setTitle('');
                setText('');
                setPicture('');
                navigation.navigate('Posts');
            }
        } else {
            Alert.alert('Error', 'To create new post you need add post title, text and post photo or video...')
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>          
            <Text style={styles.title}>Here You can create a new post!!!</Text>
            <TextInput
                placeholder='Enter Post Title...'
                style={styles.input}
                value={title}
                onChangeText={setTitle}/>
            <TextInput
                multiline={true}
                placeholder='Enter Post Text...'
                style={{
                ...styles.input,
                marginTop: 20
            }}
                value={text}
                onChangeText={setText}/>
            <View style={styles.btnCont}>
                <PhotoPicker setPictureHandler={setPictureHandler}/>
                <VideoPicker/>
            </View>
            {
                picture !== '' 
                    ? (
                        <View style={styles.picCont}>
                            <Image source={{uri: picture}} style={styles.pic} />     
                            <TouchableOpacity style={styles.removePicBtn} onPress={() => setPicture('')}>
                                <FontAwesome name="remove" size={25} color='#fff' />
                            </TouchableOpacity>                       
                        </View>
                    )
                    : <Image source={require('../../assets/image-template.jpg')} style={styles.pic} />                
            }
            <TouchableOpacity style={styles.createBtn} onPress={addNewPostHandler}>
                <Text style={styles.btnText}>Create Post</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: THEME.MAIN_COLOR,
        fontSize: 20,
        marginBottom: 50
    },
    input: {
        borderBottomColor: THEME.MAIN_COLOR,
        width: THEME.INPUT_WIDTH,
        padding: 5,
        borderBottomWidth: 2
    },
    createBtn: {
        marginTop: 10,
        width: THEME.BTN_WIDTH,
        height: THEME.BTN_HEIGHT,
        backgroundColor: THEME.MAIN_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btnText: {
        color: '#fff',
        fontSize: 17
    },
    btnCont: {
        marginTop: 20,
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-around'
    },
    picCont: {
        width: '80%',
        height: 200,
        marginTop: 20
    },
    pic: {
        width: '100%',
        height: 200       
    },
    removePicBtn: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})

export default CreatePostScreen;