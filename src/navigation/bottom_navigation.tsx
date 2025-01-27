import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from './custom_tab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/home';
import Profile from '../screens/profile/profile';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomNavigation({ navigation }: any) {

    // Handle notification when app is in background or foreground
    React.useEffect(() => {
        const unsubscribe = messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('Notification caused app to open from background state:', remoteMessage);

            const screen = remoteMessage?.data?.screen || remoteMessage?.notification?.title;

            const { messageId } = remoteMessage || {};
        });

        return unsubscribe;
    }, [navigation]);

    React.useEffect(() => {
        // Handle when the app opens from a closed state
        messaging()
            .getInitialNotification()
            .then(async remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification opened app from closed state:', remoteMessage);

                    // Extract the screen from the `data` object or use the notification title
                    const screen = remoteMessage?.data?.screen || remoteMessage?.notification?.title;
                    const { messageId } = remoteMessage;

                }
            });
    }, [navigation]);

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "local-channel", // (required)
                channelName: "Local Notification", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    React.useEffect(() => {
        createChannels();

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('Forground message', remoteMessage);
            const { notification, data } = remoteMessage;
            PushNotification.localNotification({
                channelId: "local-channel",
                title: notification?.title ?? '',
                message: notification?.body ?? '',
                userInfo: { ...data, appOpen: true }
            });
        })

        // Cleanup: Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, [])

    React.useEffect(() => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log('Tokne', token);

            },
            onNotification: function (notification) {
                console.log('LOCAL NOTIFICATION RECEIVED:', notification);
                if (notification?.data?.appOpen) {
                    const { data } = notification;
                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }, []);

    React.useEffect(() => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.addEventListener('notification', onRemoteNotification);
            PushNotificationIOS.setApplicationIconBadgeNumber(0)
        }
        return () => {
            if (Platform.OS === 'ios') {
                PushNotificationIOS.removeEventListener('notification');
            }
        };
    });

    const onRemoteNotification = (notification: any) => {
        const isClicked = notification.getData().userInteraction === 1;
        console.log('ios notification', notification);

        if (isClicked) {
            // Navigate user to another screen
        } else {
            // Do something else with push notification
        }
        // Use the appropriate result based on what you needed to do for this notification
        const result = PushNotificationIOS.FetchResult.NoData;
        notification.finish(result);
    };


    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default BottomNavigation;