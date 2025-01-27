import { View, Text, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../constants/images';
import styles from './card_style';

interface CardProps {
    title?: string;
    desc?: string
}

const Card = ({ title, desc }: CardProps) => {
    return (
        <View style={styles.cardContainer}>
            {/* Background Image */}
            <Image style={styles.cardImage} source={Images.cardImg} />

            {/* Gradient Overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
                style={styles.gradientOverlay}
            />

            {/* Text Content */}
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{title ?? '-'}</Text>
                <Text style={styles.description} numberOfLines={2}>{desc ?? '-'}</Text>
            </View>
        </View>
    );
};

export default Card;
