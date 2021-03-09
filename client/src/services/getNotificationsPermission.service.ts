import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const regusterForPushNotifications  = async () => {       
  const { status } = await  Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;
  if(status !== 'granted') {
      const { status } = await  Permissions.getAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
  } 
  if(finalStatus !== 'granted') { return; }
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    })
  });
};