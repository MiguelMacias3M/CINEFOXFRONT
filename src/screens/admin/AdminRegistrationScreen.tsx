import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNameOrSurname = (input: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(input) && input.length >= 3;
  };

  const validateAge = (age: string) => {
    const ageNumber = parseInt(age, 10);
    return ageNumber >= 18;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordRegex.test(password);
  };

  const sanitizeInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9@.\s]/g, '');
  };

  const handleRegister = async () => {
    setLoading(true);
    const sanitizedNombre = sanitizeInput(nombreUsuario.trim());
    const sanitizedApellido = sanitizeInput(apellidoUsuario.trim());
    const sanitizedCorreo = sanitizeInput(correoUsuario.trim());
    const sanitizedTelefono = sanitizeInput(telefonoUsuario.trim());
    const sanitizedContrasena = contrasenaUsuario.trim();  // Keep special characters in password

    if (!validateNameOrSurname(sanitizedNombre)) {
      Alert.alert('Validación', 'El nombre debe tener al menos 3 caracteres y no debe contener números o caracteres especiales.');
      setLoading(false);
      return;
    }

    if (!validateNameOrSurname(sanitizedApellido)) {
      Alert.alert('Validación', 'Los apellidos deben tener al menos 3 caracteres y no deben contener números o caracteres especiales.');
      setLoading(false);
      return;
    }

    if (!validateAge(edadUsuario)) {
      Alert.alert('Validación', 'Debes tener al menos 18 años para registrarte.');
      setLoading(false);
      return;
    }

    if (!validateEmail(sanitizedCorreo)) {
      Alert.alert('Validación', 'Por favor ingresa un correo electrónico válido.');
      setLoading(false);
      return;
    }

    if (!validatePhone(sanitizedTelefono)) {
      Alert.alert('Validación', 'El teléfono debe tener 10 dígitos.');
      setLoading(false);
      return;
    }

    if (!validatePassword(sanitizedContrasena)) {
      Alert.alert('Validación', 'La contraseña debe tener al menos 10 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales.');
      setLoading(false);
      return;
    }

    try {
      const userData = await registerUsuarioAdmin(
        sanitizedNombre,
        sanitizedApellido,
        edadUsuario,
        sanitizedCorreo,
        sanitizedTelefono,
        sanitizedContrasena
      );
      console.log('Administrador registrado:', userData);
      Alert.alert('Registro exitoso', 'Administrador registrado correctamente.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Error al registrar administrador:', error);
      Alert.alert('Error', 'Hubo un error al intentar registrar al administrador. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
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
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <Button
          title="Registrar"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={handleRegister}
        />
      )}
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
});

export default AdminRegistrationScreen;
