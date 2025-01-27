import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const styles = StyleSheet.create({

    nextButton: {
        borderRadius: 12,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    icon: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    text: {
        color: Colors.whiteColor,
        fontSize: 16,
        fontFamily: Fonts.Semibold
    }
});
export default styles;
