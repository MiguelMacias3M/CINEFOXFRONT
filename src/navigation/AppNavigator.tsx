import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CarteleraScreen from '../screens/CarteleraScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen'; // Importa la nueva pantalla

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cartelera: undefined;
  MovieDetail: { title: string; image: any; description: string };
  SeatSelection: { title: string; horario: string }; // Añade los parámetros necesarios
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cartelera" component={CarteleraScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Detalles de la película' }} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} options={{ title: 'Seleccione sus asientos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
