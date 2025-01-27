import React from 'react';
import {
    TouchableOpacity,
    Text,
    ColorValue,
    ActivityIndicator,
    Image,
    ImageStyle,
    StyleProp,
    ImageSourcePropType,
} from 'react-native';
import styles from './btn_style';
import Colors from '../../constants/colors';

interface ButtonProps {
    text?: string;
    onPress?: () => void;
    backgroundColor?: ColorValue;
    color?: ColorValue;
    loading?: boolean;
    image?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onPress,
    backgroundColor,
    color,
    loading,
    image,
    imageStyle,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            style={[
                styles.nextButton,
                { backgroundColor: backgroundColor || Colors.primaryColor },
            ]}>
            {image && <Image source={image} style={[styles.icon, imageStyle]} />}
            {loading ? (
                <ActivityIndicator size="small" color={color || Colors.whiteColor} />
            ) : (
                <Text
                    style={[styles.text, { color: color || Colors.primaryColor }]}>
                    {text}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
