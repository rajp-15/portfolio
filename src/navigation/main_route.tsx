import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../constants/colors';
import BottomNavigation from './bottom_navigation';
import Login from '../screens/authFlow/login/login';
import { useSelector } from 'react-redux';
import EditProfile from '../screens/editProfile/edit_profile';

const Stack = createNativeStackNavigator();

function MainRoute() {
    // Get user auth status from Redux store
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated ? 'BottomNavigation' : 'Login'}
            screenOptions={{
                presentation: 'card',
                animationTypeForReplace: 'push',
                headerShown: false,
                statusBarBackgroundColor: Colors.pastelPink,
                statusBarStyle: 'dark',
                navigationBarColor: Colors.pastelPink
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>

    )
}

export default MainRoute