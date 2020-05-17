import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InfoSalon from '../pages/InfoSalon';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Dashboard" component={Dashboard} />
//       <Tab.Screen name="InfoSalon" component={InfoSalon} />
//     </Tab.Navigator>
//   );
// }

const AppRoutes: React.FC = () => {
  // return <MyTabs />;
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#2f2f2f' },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="InfoSalon" component={InfoSalon} />
    </App.Navigator>
  );
};

export default AppRoutes;
