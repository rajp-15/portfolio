import React from 'react';
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TextInputProps,
    ImageSourcePropType,
} from 'react-native';
import SizeBox from '../../constants/sizebox';
import styles from './textinput_style';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { Images } from '../../constants/images';

interface TextBoxProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    image?: ImageSourcePropType | undefined;
    isError?: boolean;
    errorText?: string;
    readonly?: boolean | undefined;
}

const TextBox: React.FC<TextBoxProps> = props => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={{ width: '100%' }}>
            {props.label && (
                <View style={styles.labelContainer}>
                    <SizeBox width={6} />
                    <Text style={styles.labelText}>{props.label}</Text>
                </View>
            )}
            <SizeBox height={8} />
            <View style={styles.boxBorder}>
                <TextInput
                    placeholder={props.placeholder}
                    secureTextEntry={!isPasswordVisible && props.secureTextEntry}
                    placeholderTextColor={Colors.stoneGrayColor}
                    editable={props.editable}
                    keyboardType={props.keyboardType}
                    style={[styles.boxUnderStyle, {
                        color: Colors.blackColor,
                        fontSize: 14,
                        fontFamily: Fonts.Medium
                    }]}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    readOnly={props.readOnly ?? false}
                />
                {props.secureTextEntry && (
                    <View style={styles.secureIconStyle}>
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={styles.toggleButton}>
                            <Image
                                source={isPasswordVisible ? Images.view : Images.hidden}
                                style={styles.size}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {props.isError && (
                <View style={styles.errorRowStyle}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

export default TextBox;
