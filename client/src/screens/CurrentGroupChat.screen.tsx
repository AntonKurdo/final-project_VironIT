import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, {FC, useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import { THEME } from './../../theme';
import { useAppContext } from './../context/context';
import { Audio } from 'expo-av';
import { iMsg, socket } from './CurrentChat.screen';
import httpService from '../services/http.service';
import { useNavigation } from '@react-navigation/native';

const CurrentGroupChatScreen: FC = (props: any) => {

  const navigation = useNavigation();
  const {activeUserInfo, leftChat} = useAppContext();   
  const [messages, setMessages] = useState<Array<iMsg>>([]);
  const [msgText, setMsgText] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    socket.emit('open groupchat', props.route.params.id); 
    setIsLoading(true)   
  }, [])

  useEffect((): any => {   
    let cleanUpFunction = false
    const func = () => {        
      socket.on('get groupchat messages', (msg : any) => {            
        if(!cleanUpFunction) {
          setMessages(JSON.parse(msg))
          setIsLoading(false)
        }
      }); 
    }    
    func()       
    return () => cleanUpFunction = true        
  }, [])

  useEffect((): any => {   
    let cleanUpFunction = false
    const func = () => {        
      socket.on('recieve groupchat message', (msg : any) => {               
        if(!cleanUpFunction) {
          setMessages([...messages, JSON.parse(msg)])           
        }
      }); 
    }    
    func()       
    return () => cleanUpFunction = true        
  })

  const sendMessage = async () => {
   if(msgText) {       
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/message_sound.mp3')        
    );
    const newMsg: iMsg = {
      authorFullName: `${activeUserInfo.firstName} ${activeUserInfo.lastName}`,
      content: msgText,
      authorId: activeUserInfo.id,
      date: new Date(Date.now())          
    }
    socket.emit('groupchat message', newMsg, activeUserInfo.id, props.route.params.id);    
    setMsgText(''); 
    await sound.setVolumeAsync(0.2);
    await sound.playAsync();    
   } else {
     Alert.alert('Error', 'Message should not be empty')
   }
  }
  
  const exitGroupChat = () => {
    Alert.alert(
      "Attention",
      "Are You sure to left this chat?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          const leftMessage: iMsg = {
            authorFullName: `${activeUserInfo.firstName} ${activeUserInfo.lastName}`,
            authorId: activeUserInfo.id,
            content: `${activeUserInfo.firstName} ${activeUserInfo.lastName} has left the chat...`,
            date: new Date(Date.now()),
            type: 'exit'
          }
          await httpService.leftChat({
            chatId: props.route.params.id,
            userId: activeUserInfo.id,
            userLastName: activeUserInfo.lastName
          })
          socket.emit('groupchat message', leftMessage, activeUserInfo.id, props.route.params.id);  
          leftChat!(props.route.params.id);
          navigation.goBack();
         } 
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.chat}>
            <Image
                source={require('../../assets/group-chat-image.png')}
                style={styles.ava}/>
            <Text>{props.route.params.lastNames}</Text>  
            <TouchableOpacity style={styles.exitBtn} onPress={exitGroupChat}>
              <Ionicons name="md-exit-outline" size={30} color="black" /> 
            </TouchableOpacity>            
        </View>
        <ScrollView style={styles.chatsWrapper}>
          <ScrollView style={styles.messagesWrapper}>
            {      
            isLoading 
              ? (
                <View>
                <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
              </View>
              )   
              : (messages.map((message: iMsg , index: number) => {
                if(message.type !== 'exit') {
                  return  (
                    <View 
                      style={ 
                        message.authorFullName === `${activeUserInfo.firstName} ${activeUserInfo.lastName}`
                        ? {...styles.messageCont, alignSelf: 'flex-end'}
                        : {...styles.messageCont, alignSelf: 'flex-start', backgroundColor: 'gray'}
                      } 
                      key={index}>
                      <Text style={styles.messageAuthor}>{message.authorFullName}</Text>
                      <Text style={styles.messageText}>{message.content}</Text>
                      <Text style={styles.date}>{new Date(message.date).toLocaleString().split(' ')[4].substring(0,5)}</Text>
                    </View>
                  )
                } else {
                  return  (
                    <View key={index} style={styles.exitMsg}>
                      <Text style={styles.exitMsgText}>{message.content}</Text>
                    </View>
                  )
                }
           
              }) )                  
            }
          </ScrollView>           
            <View style={{justifyContent: 'center'}}>
              <TextInput 
                style={styles.input}
                multiline={true}
                placeholder='Message here...'
                value={msgText}
                onChangeText={setMsgText}
              />
              <TouchableOpacity style={styles.sendMessageBtn} onPress={sendMessage}>
               <FontAwesome5 name="telegram-plane" size={30} color={THEME.MAIN_COLOR} />
              </TouchableOpacity>
            </View>
          </ScrollView>
    </View>
)
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff'
  },
  header: {
      width: '100%',    
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
  chat: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 5,
      width: '95%',
      height: 50,
      borderBottomWidth: 1,
      borderColor: THEME.MAIN_COLOR,
      borderRadius: 10,        
      alignItems: 'center'
  },
  ava: {
      width: 40,
      height: 40,
      marginRight: 15
  },
  chatBtn: {
      position: 'absolute',
      right: 15
  },
  messagesWrapper: {    
    height: Dimensions.get('screen').height - 250,      
    paddingHorizontal: 20          
  },
  messageCont: {      
    backgroundColor: THEME.MAIN_COLOR,
    marginVertical: 5,
    padding: 7,
    minWidth: 140,
    minHeight: 70,
    borderRadius: 15,
        
  },
  messageText: {
    color: '#fff',
    fontSize: 16
  },   
  input: {
    alignSelf: 'center',
    color: '#000',
    padding: 10,
    paddingRight: 30,
    width: '90%',
    borderTopWidth: 1,
    borderTopColor: THEME.MAIN_COLOR
  },
  sendMessageBtn: {
    position: 'absolute',
    right: 20
  },
  date: {
    position: 'absolute',
    right: 5, 
    bottom: 5,
    fontSize: 11,
    color: 'lightgray'          
  },
  messageAuthor: {
    color: 'lightgray',
    fontSize: 12
  },
  exitBtn: {
    position: 'absolute',
    right: 20
  },
  exitMsg: {
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 10 
  },
  exitMsgText: {
    fontSize: 12,
    color: '#fff'
  }
})

export default CurrentGroupChatScreen;