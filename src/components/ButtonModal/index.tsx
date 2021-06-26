import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  colorButton?: string;
}

export function ButtonModal({ title, colorButton = theme.colors.primary, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, {
        backgroundColor: colorButton
      }]}
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}