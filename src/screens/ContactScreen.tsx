import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { sendContactMessage } from '../apiService'; // Importar la nueva función

type ContactScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Contact'>;

const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation<ContactScreenNavigationProp>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = async () => {
    if (name.trim() === '') {
      Alert.alert('Validación', 'Por favor ingresa tu nombre.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validación', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (message.trim() === '') {
      Alert.alert('Validación', 'Por favor ingresa un mensaje.');
      return;
    }

    try {
      await sendContactMessage(name, email, message); // Llamar a la función de envío
      Alert.alert('Mensaje enviado', 'Tu mensaje ha sido enviado correctamente');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Contáctanos</Text>
      <Text style={styles.subtitle}>
        Nos encantaría saber de ti. Por favor, llena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensaje"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Button
          title="Enviar"
          buttonStyle={styles.button}
          onPress={handleSend}
        />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>Dirección: Calle La Nueba #123, Aguascalientes, México</Text>
        <Text style={styles.contactText}>Teléfono: +1 234 567 890</Text>
        <Text style={styles.contactText}>Correo: contacto@cinefox.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    borderRadius: 10,
  },
  contactInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default ContactScreen;
