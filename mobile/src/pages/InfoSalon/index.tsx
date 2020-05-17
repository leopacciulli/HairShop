import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Header,
  Container,
  Block,
  Title,
  Subtitle,
  InfoPayment,
  Payment,
  Salon,
  NameSalon,
  Name,
} from './styles';

const InfoSalon: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#7B7B7B" />
        </TouchableOpacity>
        <Salon>
          <NameSalon>Salão</NameSalon>
          <Name>Jonas & Márcia</Name>
        </Salon>
      </Header>
      <Container>
        <ScrollView>
          <Block>
            <Title>Preços:</Title>
            <Subtitle>Corte Unisex: R$ 25,00</Subtitle>
            <Subtitle>Unha: R$ 15,00</Subtitle>
            <Subtitle>Pé: R$ 10,00</Subtitle>
            <Subtitle>Unha + Pé: R$ 20,00</Subtitle>
            <Subtitle>Chapinha: R$ 40,00</Subtitle>
            <Subtitle>Escova: R$ 30,00</Subtitle>
          </Block>
          <Block>
            <Title>Endereço:</Title>
            <Subtitle>Largo Santa Luzia, 14</Subtitle>
            <Subtitle>Santa Luzia, 12919-514</Subtitle>
            <Subtitle>Bragança Paulista - SP</Subtitle>
          </Block>
          <Block>
            <Title>Telefones:</Title>
            <Subtitle>Fixo: (11) 4032-2365</Subtitle>
            <Subtitle>Cel: (11) 99665-3886</Subtitle>
          </Block>
        </ScrollView>
      </Container>

      <InfoPayment>
        <Payment>Aceitamos pagamento somente em dinheiro</Payment>
      </InfoPayment>
    </>
  );
};
export default InfoSalon;
