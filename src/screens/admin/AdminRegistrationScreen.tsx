import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { registerUsuarioAdmin } from '../../apiService';

type AdminRegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminRegistration'>;

const AdminRegistrationScreen: React.FC<{ navigation: AdminRegistrationScreenNavigationProp }> = ({ navigation }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [edadUsuario, setEdadUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');

  const handleRegister = async () => {
    try {
      const userData = await registerUsuarioAdmin(
        nombreUsuario,
        apellidoUsuario,
        edadUsuario,
        correoUsuario,
        telefonoUsuario,
        contrasenaUsuario
      );
      console.log('Administrador registrado:', userData);
      Alert.alert('Registro exitoso', 'Administrador registrado correctamente.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Error al registrar administrador:', error);
      Alert.alert('Error', 'Hubo un error al intentar registrar al administrador. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Administrador en CINE-FOX</Text>
      <Input
        placeholder="Nombre"
        leftIcon={<Image source={require('../../assets/icons/user.png')} style={styles.icon} />}
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Apellidos"
        leftIcon={<Image source={require('../../assets/icons/dobleuser.png')} style={styles.icon} />}
        value={apellidoUsuario}
        onChangeText={setApellidoUsuario}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Edad"
        leftIcon={<Image source={require('../../assets/icons/calendar.png')} style={styles.icon} />}
        value={edadUsuario}
        onChangeText={setEdadUsuario}
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Correo electrónico"
        leftIcon={<Image source={require('../../assets/icons/correo.png')} style={styles.icon} />}
        value={correoUsuario}
        onChangeText={setCorreoUsuario}
        keyboardType="email-address"
        autoCapitalize="none"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Teléfono"
        leftIcon={<Image source={require('../../assets/icons/phone.png')} style={styles.icon} />}
        value={telefonoUsuario}
        onChangeText={setTelefonoUsuario}
        keyboardType="phone-pad"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Contraseña"
        leftIcon={<Image source={require('../../assets/icons/password.png')} style={styles.icon} />}
        value={contrasenaUsuario}
        onChangeText={setContrasenaUsuario}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        secureTextEntry
      />
      <Button
        title="Registrar"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={handleRegister}
      />
      <Text style={styles.footerText}>
        ¿Ya tienes una cuenta?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.goBack()}>
          Iniciar sesión
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    paddingLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#E50914',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    right: 60,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  footerLink: {
    color: '#E50914',
    fontWeight: 'bold',
  },
});

export default AdminRegistrationScreen;
