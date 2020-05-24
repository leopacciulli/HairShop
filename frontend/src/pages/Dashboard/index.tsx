/* eslint-disable react/jsx-curly-newline */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter, isBefore } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower, FiClock, FiXCircle } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import ModalCancelAppointment from '../../components/ModalCancelAppointment';

import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  UserAppointment,
  Calendar,
} from './styles';

import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface AppointmentToCancel {
  appointment_id: string;
  user_id: string;
  user_name: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const [today, setToday] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalCancelAppointment, setModalCancelAppointment] = useState(false);
  const [dataCancelAppointment, setDataCancelAppointment] = useState({});
  const [appointmentToCancel, setAppointmentToCancel] = useState<
    AppointmentToCancel[]
  >([]);

  useEffect(() => {
    setToday(format(new Date(), 'dd/MM/yyyy'));
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const handleOpenModalCancelAppointment = (appointment: Appointment) => {
    const dataAppointment = {
      day: format(parseISO(appointment.date), 'd/MM/yyyy'),
      hour: appointment.hourFormatted,
      user: appointment.user.name,
    };
    const dataAppointmentToCancel = {
      appointment_id: appointment.id,
      user_id: appointment.user.id,
      user_name: appointment.user.name,
    };
    const arrayAppointment = [dataAppointmentToCancel];
    setDataCancelAppointment(dataAppointment);
    setAppointmentToCancel(arrayAppointment);
    setModalCancelAppointment(true);
  };

  const handleCloseModalCancelAppointment = () => {
    setModalCancelAppointment(false);
  };

  const handleConfirmCancelAppointment = useCallback(async () => {
    try {
      await api.delete(
        `/appointments/${appointmentToCancel[0].appointment_id}`,
        { data: { user_id: appointmentToCancel[0].user_id } },
      );

      setAppointments(
        appointments.filter(
          (appointment) =>
            appointment.id !== appointmentToCancel[0].appointment_id,
        ),
      );

      addToast({
        type: 'success',
        title: 'Agendamento cancelado!',
        description: `Agendamento do cliente ${appointmentToCancel[0].user_name} foi cancelado.`,
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao cancelar agendamento!',
        description: `Tente novamente.`,
      });
    }

    setModalCancelAppointment(false);
  }, [addToast, appointments, appointmentToCancel]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    const disabledDates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    const datesBefore: Array<any> = [];
    disabledDates.forEach((disabledDate) => {
      if (isBefore(disabledDate, new Date())) {
        datesBefore.push(disabledDate);
      }
      return datesBefore;
    });

    return datesBefore;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    const weekDay = format(selectedDate, 'cccc', {
      locale: ptBR,
    });
    if (weekDay !== 'sábado' && weekDay !== 'domingo') {
      return `${weekDay}-feira`;
    }
    return weekDay;
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) => {
      return isAfter(parseISO(appointment.date), new Date());
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Logo" />

          <Link to="/profile">
            <Profile>
              <img src={user.avatar} alt={user.name} />
              <div>
                <span>Bem-vindo,</span>
                <strong>{user.name}</strong>
              </div>
            </Profile>
          </Link>

          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          <p>
            <span>
              {appointments.length === 10
                ? 'Agenda lotada'
                : 'Há horários disponíveis'}
            </span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <section>
                <img src={nextAppointment.user.avatar} alt="Avatar" />

                <div>
                  <strong>{nextAppointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModalCancelAppointment(nextAppointment)
                  }
                >
                  <FiXCircle size={24} />
                </button>
              </section>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <UserAppointment>
                  <div>
                    <img src={appointment.user.avatar} alt="Avatar" />
                    <strong>{appointment.user.name}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenModalCancelAppointment(appointment)
                    }
                  >
                    <FiXCircle size={24} />
                  </button>
                </UserAppointment>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <UserAppointment>
                  <div>
                    <img src={appointment.user.avatar} alt="Avatar" />
                    <strong>{appointment.user.name}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenModalCancelAppointment(appointment)
                    }
                  >
                    <FiXCircle size={24} />
                  </button>
                </UserAppointment>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar>
          <strong>Hoje é dia: {today}</strong>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 1] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [2, 3, 4, 5, 6] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubto',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>

      <ModalCancelAppointment
        appointment={dataCancelAppointment}
        isOpen={modalCancelAppointment}
        handleConfirmCancel={handleConfirmCancelAppointment}
        handleClose={handleCloseModalCancelAppointment}
      />
    </Container>
  );
};

export default Dashboard;
