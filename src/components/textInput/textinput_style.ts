import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        shadowColor: 'white',
    },
    labelText: {
        color: Colors.blackColor,
        fontSize: 18,
        fontFamily: Fonts.Semibold
    },
    boxBorder: {
        borderRadius: 12,
        borderWidth: 1.2,
        justifyContent: 'center',
        paddingHorizontal: 12,
        height: 50,
        borderColor: Colors.primaryColor,
    },
    boxUnderStyle: {
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secureIconStyle: {
        position: 'absolute',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    toggleButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    size: {
        height: 20,
        width: 20,
        tintColor: Colors.stoneGrayColor,
    },
    errorRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7,
        marginTop: 4,
    },
    errorText: {
        color: Colors.error,
    },
});
export default styles;
