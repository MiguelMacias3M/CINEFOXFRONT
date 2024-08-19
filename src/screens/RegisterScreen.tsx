import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { registerUsuarioCliente } from '../apiService';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
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
    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedSurname = sanitizeInput(surname.trim());
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedPhone = sanitizeInput(phone.trim());
    const sanitizedPassword = password.trim();  // Keep special characters in password

    if (!validateNameOrSurname(sanitizedName)) {
      Alert.alert('Validación', 'El nombre debe tener al menos 3 caracteres y no debe contener números o caracteres especiales.');
      return;
    }

    if (!validateNameOrSurname(sanitizedSurname)) {
      Alert.alert('Validación', 'Los apellidos deben tener al menos 3 caracteres y no deben contener números o caracteres especiales.');
      return;
    }

    if (!validateAge(age)) {
      Alert.alert('Validación', 'Debes tener al menos 18 años para registrarte.');
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      Alert.alert('Validación', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePhone(sanitizedPhone)) {
      Alert.alert('Validación', 'El teléfono debe tener 10 dígitos.');
      return;
    }

    if (!validatePassword(sanitizedPassword)) {
      Alert.alert('Validación', 'La contraseña debe tener al menos 10 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales.');
      return;
    }

    setLoading(true);

    try {
      const userData = await registerUsuarioCliente(sanitizedName, sanitizedSurname, age, sanitizedEmail, sanitizedPhone, sanitizedPassword);
      console.log('Usuario registrado:', userData);
      Alert.alert('Registro exitoso', 'Te has registrado exitosamente.', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'Hubo un error al intentar registrarse. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgeChange = (text: string) => {
    const formattedText = text.replace(/\D/g, ''); // Solo permite dígitos
    if (formattedText.length <= 2) {
      setAge(formattedText);
    }
  };

  const handlePhoneChange = (text: string) => {
    const formattedText = text.replace(/\D/g, ''); // Solo permite dígitos
    if (formattedText.length <= 10) {
      setPhone(formattedText);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro en CINE-FOX</Text>
      <Input
        placeholder="Nombre"
        leftIcon={<Image source={require('../assets/icons/user.png')} style={styles.icon} />}
        value={name}
        onChangeText={setName}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Apellidos"
        leftIcon={<Image source={require('../assets/icons/dobleuser.png')} style={styles.icon} />}
        value={surname}
        onChangeText={setSurname}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Edad"
        leftIcon={<Image source={require('../assets/icons/calendar.png')} style={styles.icon} />}
        value={age}
        onChangeText={handleAgeChange}
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        maxLength={2} // Limitar la entrada a 2 dígitos
      />
      <Input
        placeholder="Correo electrónico"
        leftIcon={<Image source={require('../assets/icons/correo.png')} style={styles.icon} />}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Teléfono"
        leftIcon={<Image source={require('../assets/icons/phone.png')} style={styles.icon} />}
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        maxLength={10} // Limitar la entrada a 10 dígitos
      />
      <Input
        placeholder="Contraseña"
        leftIcon={<Image source={require('../assets/icons/password.png')} style={styles.icon} />}
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        secureTextEntry={!passwordVisible}
        rightIcon={
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={
                passwordVisible
                  ? require('../assets/icons/eye-open.png')
                  : require('../assets/icons/eye-closed.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <Button
          title="Registrarse"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={handleRegister}
        />
      )}
      <Text style={styles.footerText}>
        ¿Ya tienes una cuenta?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
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

export default RegisterScreen;
