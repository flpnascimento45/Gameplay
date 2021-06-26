import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  colorButton?: string;
}

export function Button({ title, colorButton = theme.colors.primary, ...rest }: Props) {
  return (
    <RectButton
      style={[styles.container, {
        backgroundColor: colorButton
      }]}
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  );
}