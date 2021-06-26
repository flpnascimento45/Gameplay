import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 175,
        position: 'absolute',
        bottom: 0
    },
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay
    },
    bar: {
        width: 39,
        height: 2,
        borderRadius: 2,
        backgroundColor: theme.colors.secondary30,
        alignSelf: 'center',
        marginTop: 13,
    },
    containerTitle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        marginVertical: 10
    }
});