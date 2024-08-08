import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { logoutUsuario } from '../../apiService';
import { useNavigation } from '@react-navigation/native';

type AdminWelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminWelcome'>;
type AdminWelcomeScreenRouteProp = RouteProp<RootStackParamList, 'AdminWelcome'>;

type Props = {
  navigation: AdminWelcomeScreenNavigationProp;
  route: AdminWelcomeScreenRouteProp;
};

const AdminWelcomeScreen: React.FC<Props> = ({ route }) => {
  const { adminName } = route.params;
  const navigation = useNavigation<AdminWelcomeScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await logoutUsuario();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {adminName}</Text>
      <Text style={styles.subtitle}>Panel de Administración</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} color="#E50914" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2D3E50',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#BBBBBB',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default AdminWelcomeScreen;
