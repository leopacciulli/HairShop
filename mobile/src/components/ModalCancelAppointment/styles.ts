import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const ContainerModal = styled.View`
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 40px 0;
`;

export const ContentModal = styled.View`
  width: ${Dimensions.get('window').width}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleModal = styled.Text`
  font-size: 24px;
  color: #2f2f2f;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  margin-bottom: 40px;
`;

export const DescriptionModal = styled.Text`
  font-size: 18px;
  color: #2f2f2f;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  padding: 0 24px;
  line-height: 24px;
`;

export const ButtonsModal = styled.View`
  margin-top: 92px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const TouchableYes = styled.TouchableOpacity`
  background: #2f2f2f;
  width: 112px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const TouchableNo = styled.TouchableOpacity`
  background: #dedede;
  width: 112px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

export const ButtonYes = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const ButtonNo = styled.Text`
  font-size: 16px;
  color: #2f2f2f;
  font-family: 'RobotoSlab-Regular';
`;
