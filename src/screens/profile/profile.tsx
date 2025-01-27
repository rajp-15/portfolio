import { View, Text, Alert } from 'react-native'
import React from 'react'
import styles from './profile_style'
import SizeBox from '../../constants/sizebox'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ListContainers from './components/list_containers'
import Fonts from '../../constants/fonts'
import Colors from '../../constants/colors'
import { useDispatch } from 'react-redux';
import { logout } from '../../state/slices/authSlice'

const Profile = ({ navigation }: any) => {

    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(logout());
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }], // Navigate to Login or Welcome screen
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <SizeBox height={insets.top} />
            <Text style={{ marginLeft: 10, fontSize: 18, fontFamily: Fonts.Semibold, color: Colors.blackColor, fontWeight: '600' }}>Profile</Text>
            <SizeBox height={10} />
            <View style={{ marginHorizontal: 10 }}>
                <ListContainers title={'Edit Profile'} onPress={() => navigation.navigate('EditProfile')} />
                <SizeBox height={10} />
                <ListContainers title={'Log out'} isLogOut={true} onPress={handleLogout} />
            </View>
        </View>
    )
}

export default Profile