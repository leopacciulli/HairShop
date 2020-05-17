import styled from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const InfoSalon = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #2f2f2f;
  padding: 16px 24px ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
