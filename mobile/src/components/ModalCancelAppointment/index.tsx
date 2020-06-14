import React from 'react';
import Modal from 'react-native-modal';

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

interface Props {
  visible: boolean;
  handleConfirm: () => void;
  handleNotConfirm: () => void;
}

const ModalCancelAppointment: React.FC<Props> = ({
  visible,
  handleConfirm,
  handleNotConfirm,
}) => {
  return (
    <Modal isVisible={visible} backdropColor="#2f2f2f" backdropOpacity={0.7}>
      <ContainerModal>
        <ContentModal>
          <TitleModal>Cancelamento</TitleModal>

          <DescriptionModal>Deseja cancelar o agendamento</DescriptionModal>
          <DescriptionModal>do dia 20/02/2020 às 16:00</DescriptionModal>
          <DescriptionModal>com Jonas Ferreira?</DescriptionModal>

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
