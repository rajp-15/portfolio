import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import SizeBox from '../constants/sizebox';
import { Images } from '../constants/images';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();
    const scaleAnimations = useRef(state.routes.map(() => new Animated.Value(1))).current;

    useEffect(() => {
        scaleAnimations.forEach((animation, index) => {
            Animated.spring(animation, {
                toValue: state.index === index ? 1.2 : 1,
                useNativeDriver: true,
            }).start();
        });
    }, [state.index]);

    const images: { [key: string]: any } = {
        Home: Images.home,
        Profile: Images.profile,
    };

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <Animated.View
                            style={[
                                isFocused ? styles.activeIndicator : null,
                                { transform: [{ scale: scaleAnimations[index] }] },
                            ]}
                        >
                            <View style={isFocused ? styles.activeIndicatorContainer : null}>
                                <Image
                                    source={images[route.name]}
                                    style={[
                                        styles.icon,
                                        isFocused && { tintColor: Colors.primaryColor },
                                    ]}
                                />
                            </View>
                        </Animated.View>
                        <SizeBox height={5} />
                        <Text style={[styles.label, isFocused && styles.activeLabel]}>
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    label: {
        fontSize: 13,
        color: Colors.whiteColor,
        fontFamily: Fonts.Semibold,
    },
    activeLabel: {
        fontSize: 16,
        color: Colors.whiteColor,
        fontFamily: Fonts.Bold,
    },
    activeIndicator: {
        width: 40,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: -4.3,
        zIndex: 1,
    },
    activeIndicatorContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: Colors.pastelPink,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -31,
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: Colors.whiteColor,
    },
});

export default CustomTabBar;


