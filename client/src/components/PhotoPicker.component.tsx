import React, {FC, useState} from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';

import { THEME } from './../../theme';


interface iPhotoPickerProps {
  setPictureHandler: (uri: string) => void
}

async function askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.MEDIA_LIBRARY  
  );
  if(status !== 'granted') {
    Alert.alert('Error', 'You have not given the rights to create the photo...');
    return false;
  }
  return true;
};

export const PhotoPicker: FC<iPhotoPickerProps> = ({setPictureHandler}) => {

    const takePhoto = async () => {
    const hasPermissions = await askForPermissions();

    if(!hasPermissions) {
      return 
    }
   const img =  await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
      videoMaxDuration: 17
    })
    if(!img.cancelled) {
      setPictureHandler(img.uri)
    }    
    
  }
  return (
    <View style={styles.wrapper}>
        <TouchableOpacity onPress={takePhoto}>
          <MaterialIcons name="add-a-photo" size={30} color={THEME.MAIN_COLOR} />
        </TouchableOpacity>    
    </View> 
  )
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  }
})