import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.pastelPink,
        paddingBottom: 30,
    },
    titleBox: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        color: Colors.blackColor,
        fontSize: 16,
        fontFamily: Fonts.Regular,
        marginLeft: 15,
    },
    subTitle: {
        color: Colors.stoneGrayColor,
        fontSize: 12,
        fontFamily: Fonts.Regular,
        marginLeft: 15,
    },
    ListContainer: {
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 12
    }
});
export default styles;
