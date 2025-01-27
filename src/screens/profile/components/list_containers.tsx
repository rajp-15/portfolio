import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import { Images } from '../../../constants/images';

interface ListContainersProps {
    title: string;
    onPress?: any;
    isLogOut?: boolean;
}

const ListContainers = ({ title, onPress, isLogOut }: ListContainersProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={[styles.title, { color: isLogOut ? Colors.error : Colors.stoneGrayColor, }]}>{title}</Text>
            {!isLogOut && <Image source={Images.next} style={styles.icon} tintColor={Colors.stoneGrayColor} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 12,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor
    },
    title: {
        fontSize: 16, fontFamily: Fonts.Regular, fontWeight: '500'
    },
    icon: {
        height: 18, width: 18
    }
});

export default ListContainers;
