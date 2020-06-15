import { useNavigation, useRoute } from '@react-navigation/native';
import { format, isBefore } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
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

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    async function loadProviders() {
      await api.get('providers').then((response) => {
        const onlyProviders = response.data.filter(
          (prov: any) => prov.isProvider === true,
        );
        setProviders(onlyProviders);
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

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (date) {
        date.setDate(date.getDate() + 1);
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleMonthChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (date) {
        if (new Date().getMonth() === date.getMonth()) {
          setSelectedDate(new Date());
        } else {
          setSelectedDate(date);
        }
      }
    },
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
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

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

  const nextDays = [];

  for (let i = 1; i < 31; i++) {
    const day = i < 10 ? `0${i}` : i;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const mountMonth = month < 10 ? `0${month}` : month;

    const getDate = `${year}-${mountMonth}-${day}`;
    if (isBefore(new Date(getDate), new Date())) {
      nextDays.push(getDate);
    }
  }

  const newDaysObject = {};
  nextDays.forEach((day) => {
    newDaysObject[day] = {
      disableTouchEvent: true,
    };
  });

  LocaleConfig.defaultLocale = 'pr-BR';

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
            disableArrowLeft={selectedDate.getMonth() === new Date().getMonth()}
            onPressArrowLeft={(substractMonth) => substractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            style={{
              backgroundColor: '#323232',
              borderRadius: 8,
            }}
            markedDates={{
              ...newDaysObject,
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

          {/* <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar data</OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              textColor="#f4ede8"
              value={selectedDate}
              onChange={handleDateChanged}
            />
          )} */}
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
