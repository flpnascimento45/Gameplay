import React, { ReactNode } from 'react';
import {
    View,
    Modal,
    ModalProps,
    TouchableWithoutFeedback
} from 'react-native';

import { styles } from './styles';

import { Background } from '../Background';

type Props = ModalProps & {
    children: ReactNode
    closeModal: () => void;
}

export function ModalMenu({
    children,
    closeModal,
    ...rest
}: Props) {
    return (
        <Modal
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            {/* <TouchableWithoutFeedback onPress={closeModal}> */}
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background>
                        {children}
                    </Background>
                </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
        </Modal>
    );
}