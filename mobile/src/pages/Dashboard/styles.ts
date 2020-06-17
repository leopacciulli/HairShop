import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.TouchableOpacity`
  padding: 24px;
  background: #2f2f2f;
  padding-top: ${getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #666360;
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 0 24px;
`;

export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderContainer = styled(RectButton)`
  background: #2f2f2f;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #666360;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const MyAppointments = styled.View`
  padding: 24px 0;
`;

export const NoAppointmentContainer = styled.View`
  padding-bottom: 16px;
`;

export const NoAppointment = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  padding: 0 8px;
`;

export const TextAppointment = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const Appointment = styled.View`
  margin-top: 16px;
  height: 48px;
  background: #2f2f2f;
  border-radius: 10px;
  padding: 4px 16px;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TextInfo = styled.Text`
  color: #7e7e7e;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const InfoSalon = styled.View`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const SignOut = styled.View`
  margin-top: 8px;
  margin-bottom: 40px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
