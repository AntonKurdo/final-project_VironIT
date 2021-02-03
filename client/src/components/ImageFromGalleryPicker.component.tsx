import React, {FC, useState} from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { AntDesign } from '@expo/vector-icons';
import { THEME } from '../../theme';
import * as MediaLibrary from 'expo-media-library';

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

interface iPhotoPickerProps {
  setPictureHandler: (uri: string) => void
}

export const ImageFromGalleryPicker: FC<iPhotoPickerProps> = ({setPictureHandler}) => {
  const takePhoto = async () => {
    const hasPermissions = await askForPermissions();
    if(!hasPermissions) {
      return 
    }
    const img = await ImagePicker.launchImageLibraryAsync();
    if(!img.cancelled) {  
      const asset = await MediaLibrary.createAssetAsync(img.uri);           
      setPictureHandler(asset.uri)
    }
  }
  return (
    <View style={styles.wrapper}>
        <TouchableOpacity onPress={takePhoto}>
          <AntDesign name="link" size={30} color={THEME.MAIN_COLOR} />
        </TouchableOpacity>    
    </View> 
  )
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  }
})