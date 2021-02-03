import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

async function askForPermissions() {
  const { status } = await Permissions.askAsync(  
    Permissions.MEDIA_LIBRARY  
  );
  if(status !== 'granted') {
    Alert.alert('Error', 'You have not given the rights to create the photo...');
    return false;
  }
  return true;
};

export const takeNewAvatar = async () => {
  const hasPermissions = await askForPermissions();
  if(!hasPermissions) {
    return 
  }
  const img = await ImagePicker.launchImageLibraryAsync();
  if(!img.cancelled) {  
    const asset = await MediaLibrary.createAssetAsync(img.uri);           
    return asset.uri;
  }  
};