import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';
import { styles } from './styles';

type Props = {
  handleSignOut: () => void
}

export function Profile({ handleSignOut }: Props) {
  const { user, singOut } = useAuth();

  return (
    <View style={styles.container}>

      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>

        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>

    </View>
  )

}