import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.pastelPink
    },
    appbarView: {
        height: 110,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: Colors.pastelPink,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.15,
        elevation: 3,
        paddingBottom: 12,
    },
    headerTextStyle: {
        fontFamily: Fonts.Medium,
        fontSize: 20,
        letterSpacing: 0.4,
        lineHeight: 26,
        color: Colors.blackColor,
        marginLeft: 14,
        marginBottom: 8
    },
    backPress: {
        height: 40,
        width: 40,
        borderRadius: 5,
        backgroundColor: Colors.whiteColor,
        marginLeft: 20,
        borderColor: Colors.primaryColor,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBox: {
        height: 120,
        width: 120,
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        color: Colors.stoneGrayColor,
        fontSize: 16,
        lineHeight: 22,
        fontFamily: Fonts.Regular,
        textAlign: 'center',
    },
});
export default styles;
