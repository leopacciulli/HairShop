import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import userIcon from '../../assets/icon_user.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  BackButton,
  CalendarContainer,
  Container,
  Content,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
  Header,
  HeaderTitle,
  Hour,
  HourText,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  ProvidersList,
  ProvidersListContainer,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Title,
  UserAvatar,
} from './styles';

LocaleConfig.locales['pr-BR'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
};

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
}

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  const routeParams = route.params as RouteParams;

  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const DISABLED_DAYS = ['Sunday', 'Monday'];

  useEffect(() => {
    setLoading(true);
    async function loadProviders() {
      await api.get('providers').then((response) => {
        const onlyProviders = response.data.filter(
          (prov: any) => prov.isProvider === true,
        );
        setProviders(onlyProviders);
        setLoading(false);
      });
    }
    loadProviders();
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  useEffect(() => {
    async function getDaysInMonth(
      month: number,
      year: number,
      days: Array<string>,
    ) {
      const pivot = moment().month(month).year(year).startOf('month');
      const end = moment().month(month).year(year).endOf('month');

      const dates = {};
      const disabled = { disableTouchEvent: true };
      while (pivot.isBefore(end)) {
        days.forEach((day: string) => {
          dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
        });
        pivot.add(7, 'days');
      }

      setMarkedDates(dates);
    }

    getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabledDays = (month: number, year: number, days: Array<string>) => {
    const pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');

    const dates = {};
    const disabled = { disableTouchEvent: true };
    while (pivot.isBefore(end)) {
      days.forEach((day: string) => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }

    setMarkedDates(dates);
  };

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedHour(0);
    setSelectedProvider(providerId);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (date) {
        setSelectedHour(0);
        date.setDate(date.getDate() + 1);
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleMonthChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (date) {
        disabledDays(date.getMonth(), date.getFullYear(), DISABLED_DAYS);
        if (new Date().getMonth() === date.getMonth()) {
          setSelectedDate(new Date());
        } else {
          setSelectedDate(date);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    if (selectedHour === 0) {
      Alert.alert(
        'Selecionar horário',
        'Escolha o horário do seu agendamento para finalizar',
      );
      return;
    }

    try {
      setLoading(true);
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      setLoading(false);
      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Tente criar o seu agendamento novamente',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const dayCalendarSelected = `${selectedDate.getFullYear()}-${
    Number(selectedDate.getMonth() + 1) < 10
      ? `0${selectedDate.getMonth() + 1}`
      : selectedDate.getMonth() + 1
  }-${
    Number(selectedDate.getDate()) < 10
      ? `0${selectedDate.getDate()}`
      : selectedDate.getDate()
  }`;

  LocaleConfig.defaultLocale = 'pr-BR';

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
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        {user.avatar ? (
          <UserAvatar source={{ uri: user.avatar }} />
        ) : (
          <UserAvatar source={userIcon} />
        )}
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Title>Escolha a data</Title>

        <CalendarContainer>
          <Calendar
            current={selectedDate}
            onDayPress={(day) =>
              handleDateChanged(null, new Date(day.dateString))
            }
            onMonthChange={(month) =>
              handleMonthChanged(
                null,
                new Date(`${month.year}-${month.month}-01`),
              )
            }
            renderArrow={(direction) => (
              <Icon name={`chevron-${direction}`} size={20} color="#dedede" />
            )}
            onPressArrowLeft={(substractMonth) => substractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            style={{
              backgroundColor: '#323232',
              borderRadius: 8,
            }}
            markedDates={{
              ...markedDates,
              [dayCalendarSelected]: { selected: true },
            }}
            theme={{
              textDisabledColor: 'transparent',
              selectedDayBackgroundColor: '#dedede',
              selectedDayTextColor: '#333',
              todayTextColor: '#dedede',
              textSectionTitleColor: '#7E7E7E',
              dayTextColor: '#7E7E7E',
              calendarBackground: '#323232',
              monthTextColor: '#7E7E7E',
              textDayHeaderFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textDayHeaderFontSize: 18,
              textMonthFontSize: 18,
            }}
          />
        </CalendarContainer>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour)}
                  available={available}
                  key={hourFormatted}
                >
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, hour, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    onPress={() => handleSelectHour(hour)}
                    available={available}
                    key={hourFormatted}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
