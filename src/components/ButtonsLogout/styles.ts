import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    containerButton: {
        width: 162,
        height: 58,
        marginHorizontal: 10,
        paddingTop: 1,
        paddingHorizontal: 1,
        alignItems: 'center',
        borderRadius: 8
    }
});