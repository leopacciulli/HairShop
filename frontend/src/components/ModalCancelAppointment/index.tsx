import React from 'react';
import Modal from 'react-modal';
import { ModalContent, Buttons, ButtonYes, ButtonNo } from './styles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirmCancel: () => void;
  appointment: any;
}

const ModalCancelAppointment: React.FC<Props> = ({
  isOpen,
  appointment,
  handleClose,
  handleConfirmCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(47, 47, 47, 0.7)',
        },
        content: {
          position: 'absolute',
          top: '30%',
          left: '40%',
          right: 0,
          bottom: 0,
          background: '#FFFFFF',
          width: 355,
          height: 355,
        },
      }}
    >
      <ModalContent>
        <strong>Cancelamento</strong>
        <span>Cancelar o agendamento do dia</span>
        <span>
          {appointment.day} às {appointment.hour} do cliente
        </span>
        <span>{appointment.user}?</span>
        <Buttons>
          <ButtonYes type="button" onClick={handleConfirmCancel}>
            Sim
          </ButtonYes>
          <ButtonNo type="button" onClick={handleClose}>
            Não
          </ButtonNo>
        </Buttons>
      </ModalContent>
    </Modal>
  );
};

export default ModalCancelAppointment;
