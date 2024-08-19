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
import DulceriaScreen from '../screens/DulceriaScreen';
import ContactScreen from '../screens/ContactScreen';
import AdminWelcomeScreen from '../screens/admin/AdminWelcomeScreen';
import MovieManagementScreen from '../screens/admin/MovieManagementScreen';
import AssignMovieToRoomScreen from '../screens/admin/AssignMovieToRoomScreen';
import SetRoomScheduleScreen from '../screens/admin/SetRoomScheduleScreen';
import MovieFormScreen from '../screens/admin/MovieFormScreen';
import AdminRegistrationScreen from '../screens/admin/AdminRegistrationScreen';
import EditMovieScreen from '../screens/admin/EditMovieScreen';
import LogsScreen from '../screens/admin/LogsScreen';
import ContactoMsjScreen from '../screens/admin/ContactoMsjScreen';
import SalaManagementScreen from '../screens/admin/SalaManagementScreen';
import SoporteScreen from '../screens/admin/SoporteScreen';

export type RootStackParamList = {
  Home: undefined;
  Cartelera: undefined;
  Login: undefined;
  MovieDetail: { title: string; image: any; description: string; };
  Payment: { movieTitle: string; schedule: string; seats: string[]; price: number; };
  Register: undefined;
  SeatSelection: { movieTitle: string; schedule: string; seatsCount: number; };
  Dulceria: undefined;
  Contacto: undefined;
  AdminWelcome: { adminName: string; };
  MovieManagement: undefined;
  AssignMovieToRoom: { movieId: string; };
  SetRoomSchedule: { movieId: string; roomId: string; };
  MovieForm: undefined; // Pantalla para agregar nuevas películas
  AdminRegistration: undefined; // Pantalla para registrar administradores
  EditMovie: { movieId: string; nombrePelicula: string; descripcion: string; fechaDeEmision: string; horaProgramada: string; turno: string; }; // Pantalla para editar películas
  Logs: undefined; 
  ContactoMsj: undefined; 
  SalaManagement: undefined; 
  Soporte: undefined; 
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
        <Stack.Screen name="Dulceria" component={DulceriaScreen} />
        <Stack.Screen name="Contacto" component={ContactScreen} />
        <Stack.Screen name="AdminWelcome" component={AdminWelcomeScreen} />
        <Stack.Screen name="MovieManagement" component={MovieManagementScreen} />
        <Stack.Screen name="AssignMovieToRoom" component={AssignMovieToRoomScreen} />
        <Stack.Screen name="SetRoomSchedule" component={SetRoomScheduleScreen} />
        <Stack.Screen name="MovieForm" component={MovieFormScreen} />
        <Stack.Screen name="AdminRegistration" component={AdminRegistrationScreen} />
        <Stack.Screen name="EditMovie" component={EditMovieScreen} />
        <Stack.Screen name="Logs" component={LogsScreen} />
        <Stack.Screen name="ContactoMsj" component={ContactoMsjScreen} />
        <Stack.Screen name="SalaManagement" component={SalaManagementScreen} />
        <Stack.Screen name="Soporte" component={SoporteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
