import React from 'react';
import { View } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { Button } from '../../components/Button';

type Props = {
    closeModal: () => void;
    signOut: () => void;
}

export function ButtonsLogout({ closeModal, signOut }: Props) {

    return (
        <View style={styles.container}>
            <View style={[styles.containerButton, {
                backgroundColor: theme.colors.secondary30
            }]}>
                <Button
                    title="Não"
                    colorButton={theme.colors.secondary80}
                    onPress={() => closeModal()}
                />
            </View>
            <View style={styles.containerButton}>
                <Button
                    title="Sim"
                    onPress={() => signOut()}
                />
            </View>
        </View>
    );

}