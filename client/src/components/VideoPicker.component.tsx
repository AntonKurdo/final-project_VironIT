import React, {FC, useState} from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import { THEME } from '../../theme';


interface iVideoPickerProps {
  setVideoHandler: (uri: string) => void
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

export const VideoPicker: FC<iVideoPickerProps> = ({setVideoHandler}) => {

    const takePhoto = async () => {
    const hasPermissions = await askForPermissions();

    if(!hasPermissions) {
      return 
    }
   const video =  await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
      videoMaxDuration: 17 
    })
  
    if(!video.cancelled) {
      const asset = await MediaLibrary.createAssetAsync(video.uri);      
      setVideoHandler(asset.uri)
    }    
    
  }
  return (
    <View style={styles.wrapper}>
        <TouchableOpacity onPress={takePhoto}>
          <FontAwesome name="video-camera" size={30} color={THEME.MAIN_COLOR} />
        </TouchableOpacity>    
    </View> 
  )
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  }
})