import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CarteleraScreen from '../screens/CarteleraScreen';
import LoginScreen from '../screens/LoginScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import AdminWelcomeScreen from '../screens/admin/AdminWelcomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Cartelera: undefined;
  Login: undefined;
  MovieDetail: { title: string; image: any; description: string; };
  Payment: { movieTitle: string; schedule: string; seats: string[]; price: number; };
  Register: undefined;
  SeatSelection: { movieTitle: string; schedule: string; seatsCount: number; };
  AdminWelcome: { adminName: string; };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cartelera" component={CarteleraScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen name="AdminWelcome" component={AdminWelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
