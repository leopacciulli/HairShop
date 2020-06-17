import React from 'react';
import Modal from 'react-native-modal';
import moment from 'moment';

import {
  ContainerModal,
  ContentModal,
  TitleModal,
  DescriptionModal,
  ButtonsModal,
  ButtonYes,
  ButtonNo,
  TouchableYes,
  TouchableNo,
} from './styles';

interface Appointment {
  date: string;
  provider_name: string;
}

interface Props {
  visible: boolean;
  handleConfirm: () => void;
  handleNotConfirm: () => void;
  appointment: Appointment;
}

const ModalCancelAppointment: React.FC<Props> = ({
  visible,
  handleConfirm,
  handleNotConfirm,
  appointment,
}) => {
  const date = moment(appointment.date).format('DD/MM/yyyy');
  const hour = moment(appointment.date).format('HH:mm');

  return (
    <Modal isVisible={visible} backdropColor="#2f2f2f" backdropOpacity={0.7}>
      <ContainerModal>
        <ContentModal>
          <TitleModal>Cancelamento</TitleModal>

          <DescriptionModal>Deseja cancelar o agendamento</DescriptionModal>
          <DescriptionModal>
            do dia {date} às {hour}
          </DescriptionModal>
          <DescriptionModal>com {appointment.provider_name}?</DescriptionModal>

          <ButtonsModal>
            <TouchableYes onPress={handleConfirm}>
              <ButtonYes>Sim</ButtonYes>
            </TouchableYes>
            <TouchableNo onPress={handleNotConfirm}>
              <ButtonNo>Não</ButtonNo>
            </TouchableNo>
          </ButtonsModal>
        </ContentModal>
      </ContainerModal>
    </Modal>
  );
};

export default ModalCancelAppointment;
