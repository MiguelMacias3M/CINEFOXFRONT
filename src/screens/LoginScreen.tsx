import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { loginUsuario } from '../apiService';
import { useNavigation } from '@react-navigation/native';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = () => {
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const data = await loginUsuario(correoUsuario, contrasenaUsuario);
      console.log('Datos del usuario:', data);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Bienvenido a CINE-FOX</Text>
      <Input
        placeholder="Correo electrónico"
        leftIcon={<Icon name="envelope" size={20} color="#E50914" />}
        value={correoUsuario}
        onChangeText={setCorreoUsuario}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        leftIcon={<Icon name="lock" size={24} color="#E50914" />}
        value={contrasenaUsuario}
        onChangeText={setContrasenaUsuario}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        secureTextEntry
      />
      <Button
        title="Iniciar sesión"
        buttonStyle={styles.button}
        onPress={handleLogin}
      />
      <Text style={styles.footerText}>
        ¿No tienes una cuenta? <Text style={styles.footerLink}>Regístrate</Text>
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
  logoContainer: {
    marginBottom: 20,
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  button: {
    backgroundColor: '#E50914',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center', // Asegurar que el contenido esté centrado
    justifyContent: 'center', // Asegurar que el contenido esté centrado
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

export default LoginScreen;
