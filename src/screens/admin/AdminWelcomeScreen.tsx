import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
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

  const confirmLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar la sesión y salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        confirmLogout();
        return true; // Esto evita que la acción de volver atrás ocurra automáticamente
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {adminName}</Text>
      <Text style={styles.subtitle}>Panel de Administración</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => handleNavigation('MovieManagement')}
        >
          <Text style={styles.buttonText}>Gestión de Películas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => handleNavigation('AdminRegistration')}
        >
          <Text style={styles.buttonText}>Gestión de Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => handleNavigation('SetRoomSchedule')}
        >
          <Text style={styles.buttonText}>Gestión de Horarios</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  adminButton: {
    backgroundColor: '#1A252F',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#E50914',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminWelcomeScreen;
