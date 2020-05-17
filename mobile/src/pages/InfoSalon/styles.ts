import styled from 'styled-components';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Header = styled.View`
  margin-top: ${getStatusBarHeight}px;
  height: 80px;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Salon = styled.View`
  align-items: flex-end;
  flex-direction: column;
`;

export const NameSalon = styled.Text`
  color: #666360;
  font-size: 24px;
`;

export const Name = styled.Text`
  color: #f4ede8;
  font-size: 24px;
`;

export const Container = styled.View`
  flex: 1;
  background: #3e3e3e;
  padding-bottom: ${Platform.OS === 'ios' ? 110 : 170}px;
`;

export const Block = styled.View`
  padding: 16px 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 8px;
  font-size: 16px;
  color: #7e7e7e;
`;

export const InfoPayment = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 24px 24px;
  ${24 + getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232129;
  background: #3e3e3e;
`;

export const Payment = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 24px;
  color: #dedede;
  line-height: 32px;
  text-align: center;
`;
