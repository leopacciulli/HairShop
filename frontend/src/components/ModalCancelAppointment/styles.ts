import styled from 'styled-components';

export const ModalContent = styled.div`
  height: 100%;
  color: #2f2f2f;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 24px;
    margin-bottom: 40px;
  }

  span {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const Buttons = styled.div`
  margin-top: 96px;
`;

export const ButtonYes = styled.button`
  margin-right: 16px;
  width: 112px;
  height: 40px;
  background: #2f2f2f;
  color: #fff;
  border-radius: 10px;
  border: 0;
`;

export const ButtonNo = styled.button`
  margin-left: 16px;
  width: 112px;
  height: 40px;
  background: #dedede;
  color: #2f2f2f;
  border-radius: 10px;
  border: 0;
`;
