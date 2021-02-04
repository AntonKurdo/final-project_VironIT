import React, {FC, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Video} from 'expo-av';
import httpService from '../services/http.service';
import {THEME} from './../../theme';
import {FontAwesome} from '@expo/vector-icons';
import {PhotoPicker} from './../components/PhotoPicker.component';
import {VideoPicker} from './../components/VideoPicker.component';
import {ImageFromGalleryPicker} from '../components/ImageFromGalleryPicker.component';
import {useAppContext} from '../context/context';

const CreatePostScreen : FC = () => {

    const navigation = useNavigation();

    const {activeUserInfo, getUserPosts} = useAppContext();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [picture, setPicture] = useState('');
    const [video, setVideo] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const setPictureHandler = (uri : string) => {
        // setVideo('');
        setPicture(uri);
    };

    const setVideoHandler = (uri : string) => {
        setPicture('');
        setVideo(uri);
    };
 
    const addNewPostHandler = async() => {
        if (text && title && (picture || video)) {
            setIsBtnDisabled(true);
            const isPosted = await httpService.addNewPost({title, text, picture, video, owner: activeUserInfo.id});
            if (isPosted) {
                getUserPosts && getUserPosts(await httpService.getAllUserPostsById(activeUserInfo.id))
                Alert.alert('Success', 'Your note has been posted...');
                setTitle('');
                setText('');
                setPicture('');
                setVideo('');
                navigation.navigate('My Posts');
            }
            setIsBtnDisabled(false);
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
                    <ImageFromGalleryPicker setPictureHandler={setPictureHandler}/>
                    <VideoPicker setVideoHandler={setVideoHandler}/>
                </View>
                {
                picture === '' && video === '' 
                    ? <Image source={require('../../assets/image-template.jpg')} style={styles.pic} />   
                    : (picture !== '' && video === '') 
                        && (
                            <View style={styles.picCont}>
                                <Image source={{uri: picture}} style={styles.pic} />     
                                <TouchableOpacity style={styles.removePicBtn} onPress={() => setPicture('')}>
                                    <FontAwesome name="remove" size={25} color='#fff' />
                                </TouchableOpacity>                       
                            </View>
                         )
                        ||
                     (picture === '' && video !== '')
                        &&    (<View style={styles.picCont}>
                        <Video
                            source={{
                            uri: video
                        }}
                            rate={1.0}
                            volume={0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={{
                            width: 300,
                            height: 200
                        }}/>
                        <TouchableOpacity style={styles.removePicBtn} onPress={() => setVideo('')}>
                            <FontAwesome name="remove" size={25} color='#fff'/>
                        </TouchableOpacity>
                    </View>           )
            }      
                <TouchableOpacity
                    style={styles.createBtn}
                    disabled={isBtnDisabled}
                    onPress={addNewPostHandler}>
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
        width: 130,
        justifyContent: 'space-around'
    },
    picCont: {
        width: '80%',
        height: 200,
        marginTop: 20,
        resizeMode: 'contain'
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