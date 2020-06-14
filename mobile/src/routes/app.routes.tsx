import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import Dashboard from '../pages/Dashboard';
import InfoSalon from '../pages/InfoSalon';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#3e3e3e' },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="InfoSalon" component={InfoSalon} />
      <App.Screen name="CreateAppointment" component={CreateAppointment} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRoutes;
