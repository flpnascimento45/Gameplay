import React, { ReactNode } from 'react';
import {
    View,
    Text,
    Modal,
    ModalProps
} from 'react-native';

import { styles } from './styles';

import { Background } from '../Background';

type Props = ModalProps & {
    children: ReactNode;
}

export function ModalLogout({
    children,
    ...rest
}: Props) {
    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background>
                        <View style={styles.bar} />
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>
                                Deseja sair do Game
                                <Text style={[{ color: 'red' }]}>Play</Text>
                            </Text>
                        </View>
                        {children}
                    </Background>
                </View>
            </View>
        </Modal>
    );
}