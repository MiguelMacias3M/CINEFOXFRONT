import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { registerUsuarioAdmin } from '../../apiService';

const AdminRegistrationScreen: React.FC = ({ navigation }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [edadUsuario, setEdadUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');

  const handleRegister = async () => {
    try {
      console.log('Datos a enviar:', {
        nombreUsuario,
        apellidoUsuario,
        edadUsuario,
        correoUsuario,
        telefonoUsuario,
        contrasenaUsuario,
        tipoUsuario: 'admin',
      });

      const response = await registerUsuarioAdmin(
        nombreUsuario,
        apellidoUsuario,
        edadUsuario,
        correoUsuario,
        telefonoUsuario,
        contrasenaUsuario
      );

      console.log('Respuesta del servidor:', response);

      Alert.alert('Éxito', 'Administrador registrado correctamente');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error durante el registro:', error);
      Alert.alert('Error', 'No se pudo registrar el administrador');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Administrador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaaaaa"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#aaaaaa"
        value={apellidoUsuario}
        onChangeText={setApellidoUsuario}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#aaaaaa"
        value={edadUsuario}
        onChangeText={setEdadUsuario}
        keyboardType="numeric"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#aaaaaa"
        value={correoUsuario}
        onChangeText={setCorreoUsuario}
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#aaaaaa"
        value={telefonoUsuario}
        onChangeText={setTelefonoUsuario}
        keyboardType="phone-pad"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaaaaa"
        value={contrasenaUsuario}
        onChangeText={setContrasenaUsuario}
        secureTextEntry
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonTitle}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D3E50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    width: '80%',
  },
  button: {
    backgroundColor: '#E50914',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: '80%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default AdminRegistrationScreen;
