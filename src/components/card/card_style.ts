import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cardContainer: {
        height: 300,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    cardImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    gradientOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
    },
});

export default styles;