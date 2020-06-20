import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import userIcon from '../../assets/icon_user.png';
import Button from '../../components/Button';
import ModalCancelAppointment from '../../components/ModalCancelAppointment';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Appointment,
  Container,
  Header,
  HeaderTitle,
  InfoSalon,
  MyAppointments,
  NoAppointment,
  NoAppointmentContainer,
  ProfileButton,
  ProviderAvatar,
  ProviderContainer,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,
  ProvidersList,
  ProvidersListTitle,
  SignOut,
  TextAppointment,
  TextInfo,
  UserAvatar,
  UserName,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  isProvider: boolean;
}

interface MyAppointments {
  date: string;
  id: string;
  provider_name: string;
  user_id: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [appointments, setAppointments] = useState<MyAppointments[]>([]);
  const [appointmentToDelete, setAppointmentToDelete] = useState(
    {} as MyAppointments,
  );

  useEffect(() => {
    setLoading(true);
    async function loadProviders() {
      await api.get('providers').then((response) => {
        const onlyProviders = response.data.filter(
          (prov: any) => prov.isProvider === true,
        );
        setProviders(onlyProviders);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }

    loadProviders();
  }, []);

  useEffect(() => {
    async function loadMyAppointments() {
      await api.get(`appointments/my/${user.id}`).then((response) => {
        setAppointments(response.data);
      });
    }

    loadMyAppointments();
  }, [user.id]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation],
  );

  const handleOpenModalCancelAppointment = useCallback(
    (appointment: MyAppointments) => {
      setModalVisible(true);
      setAppointmentToDelete(appointment);
    },
    [],
  );

  const handleCloseModalCancelAppointment = useCallback(() => {
    setModalVisible(false);
    setAppointmentToDelete({} as MyAppointments);
  }, []);

  const handleConfirmCancelAppointment = useCallback(async () => {
    await api.delete(`appointments/${appointmentToDelete.id}`, {
      data: { user_id: appointmentToDelete.user_id },
    });

    setAppointments(
      appointments.filter(
        (appointment) => appointment.id !== appointmentToDelete.id,
      ),
    );

    setModalVisible(false);
  }, [appointmentToDelete, appointments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#dedede" />
      </View>
    );
  }

  return (
    <Container>
      <Header onPress={navigateToProfile}>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          {user.avatar ? (
            <UserAvatar source={{ uri: user.avatar }} />
          ) : (
            <UserAvatar source={userIcon} />
          )}
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <>
            <MyAppointments>
              {appointments.length > 0 ? (
                <>
                  <TextAppointment>Meus agendamentos</TextAppointment>
                  {appointments.map((appointment) => (
                    <Appointment key={appointment.id}>
                      <View>
                        <TextInfo>
                          {format(
                            new Date(appointment.date),
                            "'Dia' dd/MM/yyyy 'às' HH:mm",
                          )}
                        </TextInfo>
                        <TextInfo>com {appointment.provider_name}</TextInfo>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          handleOpenModalCancelAppointment(appointment)
                        }
                      >
                        <Icon name="x-circle" size={24} color="#dedede" />
                      </TouchableOpacity>
                    </Appointment>
                  ))}
                </>
              ) : (
                <NoAppointmentContainer
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#dedede',
                  }}
                >
                  <NoAppointment>
                    Você não possui nenhum horário agendado
                  </NoAppointment>
                </NoAppointmentContainer>
              )}
            </MyAppointments>

            <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
          </>
        }
        ListFooterComponent={
          <>
            <InfoSalon>
              <Button onPress={() => navigation.navigate('InfoSalon')}>
                Informações do salão
              </Button>
            </InfoSalon>

            <SignOut>
              <Button onPress={signOut}>Sair do aplicativo</Button>
            </SignOut>
          </>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            {provider.avatar ? (
              <ProviderAvatar source={{ uri: provider.avatar }} />
            ) : (
              <ProviderAvatar source={userIcon} />
            )}

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#DEDEDE" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#DEDEDE" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />

      <ModalCancelAppointment
        visible={isModalVisible}
        handleConfirm={handleConfirmCancelAppointment}
        handleNotConfirm={handleCloseModalCancelAppointment}
        appointment={appointmentToDelete}
      />
    </Container>
  );
};

export default Dashboard;
