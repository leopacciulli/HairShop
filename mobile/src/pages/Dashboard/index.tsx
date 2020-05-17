import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { InfoSalon } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text onPress={signOut}>Sair</Text>
      </View>

      <InfoSalon>
        <Button onPress={() => navigation.navigate('InfoSalon')}>
          Informações do salão
        </Button>
      </InfoSalon>
    </>
  );
};

export default Dashboard;
