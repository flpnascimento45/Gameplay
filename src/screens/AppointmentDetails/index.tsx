import React, { useState, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
  ImageBackground,
  Text,
  View,
  Alert,
  FlatList,
  Share,
  Platform
} from 'react-native';

import BannerImg from '../../assets/banner.png';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';

import { AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Member, MemberProps } from '../../components/Member';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

type Params = {
  appointmentSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { appointmentSelected } = route.params as Params;

  const navigation = useNavigation();

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${appointmentSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${appointmentSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  async function dbDeleteAppointment() {

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    let appointments = (storage ? JSON.parse(storage) : []) as AppointmentProps[];

    const initialAppointments = [] as AppointmentProps[];

    appointments = appointments.reduce((newArrayAppointments, appointment) => {

      if (appointment.id !== appointmentSelected.id) {
        newArrayAppointments.push(appointment);
      }

      return newArrayAppointments;

    }, initialAppointments);

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify(appointments)
    );

    navigation.navigate('Home');

  }

  async function handleDeleteAppointment() {

    Alert.alert('Agendamento', 'Deseja excluir o agendamento?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => dbDeleteAppointment()
        }
      ]);

  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          appointmentSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
        deleteAppointment={
          <BorderlessButton onPress={handleDeleteAppointment}>
            <Fontisto
              name="close"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {appointmentSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {appointmentSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }

      {
        appointmentSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }
    </Background>
  );
}