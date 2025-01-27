import React from 'react';
import { Image, Text, View } from 'react-native';
import { Images } from '../../../constants/images';
import styles from '../home_style';
import Colors from '../../../constants/colors';

interface UserAppBarProps {
    username?: string;
    userLocation?: string;
    userProfileImg?: any;
}

const UserAppBar: React.FC<UserAppBarProps> = ({ username, userLocation, userProfileImg }) => {
    return (
        <View style={styles.titleBox}>
            <Image source={userProfileImg ? { uri: userProfileImg } : Images.profileImg} style={{ height: 42, width: 42, borderRadius: 21, borderWidth: 1, borderColor: Colors.primaryColor }} resizeMode='cover' />
            <View style={{ gap: 3 }}>
                <Text style={styles.title}>Hey {username ?? 'Username'} 👋🏻</Text>
                <Text style={styles.subTitle}>{userLocation ?? "Address"}</Text>
            </View>
        </View>
    );
};

export default UserAppBar;