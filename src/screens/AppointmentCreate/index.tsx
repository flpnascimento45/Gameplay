import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import {
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { CategorySelect } from '../../components/CategorySelect';
import { ModalView } from '../../components/ModalView';
import { Background } from '../../components/Background';
import { SmallInput } from '../../components/SmallInput';
import { GuildIcon } from '../../components/GuildIcon';
import { TextArea } from '../../components/TextArea';
import { GuildProps } from '../../components/Guild';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds';


export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModa, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function validNewAppointment() {

    if (!category) {
      return 'Necessário selecionar uma categoria!';
    }

    if (!guild.id) {
      return 'Necessário selecionar um servidor!';
    }

    if (isNaN(parseInt(month))) {
      return 'Valor inválido no mês!';
    }

    if (isNaN(parseInt(day))) {
      return 'Valor inválido no dia!';
    }

    if (isNaN(parseInt(hour))) {
      return 'Valor inválido na hora!';
    }

    if (isNaN(parseInt(minute))) {
      return 'Valor inválido no minuto!';
    }

    const monthInt = parseInt(month);
    const dayInt = parseInt(day);
    const hourInt = parseInt(hour);
    const minuteInt = parseInt(minute);

    const arrayDayMonth = [
      { vMonth: 1, vDays: { min: 1, max: 31 } },
      { vMonth: 2, vDays: { min: 1, max: 28 } },
      { vMonth: 3, vDays: { min: 1, max: 31 } },
      { vMonth: 4, vDays: { min: 1, max: 30 } },
      { vMonth: 5, vDays: { min: 1, max: 31 } },
      { vMonth: 6, vDays: { min: 1, max: 30 } },
      { vMonth: 7, vDays: { min: 1, max: 31 } },
      { vMonth: 8, vDays: { min: 1, max: 31 } },
      { vMonth: 9, vDays: { min: 1, max: 30 } },
      { vMonth: 10, vDays: { min: 1, max: 31 } },
      { vMonth: 11, vDays: { min: 1, max: 30 } },
      { vMonth: 12, vDays: { min: 1, max: 31 } }
    ];

    let findMonth = false;

    arrayDayMonth.forEach(monthArray => {

      if (monthArray.vMonth == monthInt) {

        findMonth = true;

        if (dayInt < monthArray.vDays.min || dayInt > monthArray.vDays.max) {
          return 'Valor inválido para dia!';
        }

      }

    });

    if (!findMonth) {
      return 'Valor inválido para mês!';
    }

    if (hourInt < 0 || hourInt > 23) {
      return 'Valor inválido para hora!';
    }

    if (minuteInt < 0 || minuteInt > 59) {
      return 'Valor inválido para minuto!';
    }

    if (!(description.length > 0)) {
      return 'Informe uma descrição!';
    }

    return '';

  }

  async function handleSave() {

    const returnValid = validNewAppointment();

    if (returnValid == '') {

      const newAppointment = {
        id: uuid.v4(),
        guild,
        category,
        date: `${day}/${month} às ${hour}:${minute}h`,
        description
      };

      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
      const appointments = storage ? JSON.parse(storage) : [];

      await AsyncStorage.setItem(
        COLLECTION_APPOINTMENTS,
        JSON.stringify([...appointments, newAppointment])
      );

      navigation.navigate('Home');

    } else {
      Alert.alert('Falha na validação', returnValid);
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header
            title="Agendar partida"
          />

          <Text style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon
                    ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                    : <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {
                      guild.name
                        ? guild.name
                        : 'Selecione um servidor'
                    }
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleSave}
              />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModa} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>

    </KeyboardAvoidingView>
  );
}