import React from 'react';
import { View } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { ButtonModal } from '../../components/ButtonModal';

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
                <ButtonModal
                    title="Não"
                    colorButton={theme.colors.secondary80}
                    onPress={() => closeModal()}
                />
            </View>
            <View style={styles.containerButton}>
                <ButtonModal
                    title="Sim"
                    onPress={() => signOut()}
                />
            </View>
        </View>
    );

}