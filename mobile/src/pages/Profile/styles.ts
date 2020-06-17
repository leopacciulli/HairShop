import styled from 'styled-components/native';
import { Platform, TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'ios' ? 90 : 150}px;
  margin-top: 50px;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Logo = styled.Image`
  width: 180px;
  height: 170px;
`;

export const Camera = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  background: #dedede;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 90px;
  bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 8px;
  position: relative;
`;

export const UserAvatar = styled.Image`
  width: 132px;
  height: 132px;
  border-radius: 98px;
  align-self: center;
`;
