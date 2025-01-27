import React from 'react';
import { View, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../constants/colors';

const isIos = Platform.OS === "ios";

interface LoaderProps {
    loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
    return (
        <Modal
            isVisible={loading}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.4}
            style={styles.modal}
        >
            <View style={styles.modalBackground}>
                <View style={isIos ? styles.activityIndicatorWrapperIos : styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color={Colors.primaryColor}
                        size="large"
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;


const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityIndicatorWrapperIos: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 90,
        paddingRight: 2,
        paddingBottom: 2
    },
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 90
    },
});
