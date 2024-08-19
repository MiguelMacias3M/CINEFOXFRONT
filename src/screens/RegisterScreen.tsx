import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
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

  const validatePassword = (password: string) => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return false;
    }
    if (!uppercaseRegex.test(password)) {
      Alert.alert('Error', 'La contraseña debe contener al menos una letra mayúscula.');
      return false;
    }
    if (!numberRegex.test(password)) {
      Alert.alert('Error', 'La contraseña debe contener al menos un número.');
      return false;
    }
    if (!specialCharRegex.test(password)) {
      Alert.alert('Error', 'La contraseña debe contener al menos un símbolo especial.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    try {
      if (!name || !surname || !age || !email || !phone || !password) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
      }

      if (!validatePassword(password)) {
        return;
      }

      const userData = await registerUsuarioCliente(name, surname, age, email, phone, password);
      console.log('Usuario registrado:', userData);
      Alert.alert('Registro exitoso', 'Te has registrado exitosamente.', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'Hubo un error al intentar registrarse. Por favor, inténtalo de nuevo.');
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
        secureTextEntry
      />
      <Button
        title="Registrarse"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={handleRegister}
      />
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
