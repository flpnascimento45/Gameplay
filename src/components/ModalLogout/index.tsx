import React, { ReactNode } from 'react';
import {
    View,
    Modal,
    ModalProps,
    TouchableWithoutFeedback,
    Text
} from 'react-native';

import { styles } from './styles';

import { Background } from '../Background';

type Props = {
    children: ReactNode;
    visible: boolean;
}

export function ModalLogout({
    children,
    visible
}: Props) {
    return (

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

    );
}