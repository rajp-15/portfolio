import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.pastelPink,
    },
    welcomeText: {
        color: Colors.blackColor,
        fontSize: 30,
        fontFamily: Fonts.Heavy,
    }
});
export default styles;
