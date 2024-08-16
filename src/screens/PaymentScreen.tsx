import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

type Props = {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
};

const PaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { title, horario, tickets, seats, price } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const validateInputs = () => {
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
      Alert.alert('Error', 'Por favor, ingrese un número de tarjeta válido (16 dígitos).');
      return false;
    }

    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      Alert.alert('Error', 'Por favor, ingrese una fecha de expiración válida (MM/AA).');
      return false;
    }

    if (!cvv || !cvvRegex.test(cvv)) {
      Alert.alert('Error', 'Por favor, ingrese un CVV válido (3 dígitos).');
      return false;
    }

    if (!cardholderName) {
      Alert.alert('Error', 'Por favor, ingrese el nombre del titular de la tarjeta.');
      return false;
    }

    return true;
  };

  const handlePayment = () => {
    if (validateInputs()) {
      // Aquí puedes manejar la lógica de procesamiento de pagos
      console.log('Card Number:', cardNumber);
      console.log('Expiry Date:', expiryDate);
      console.log('CVV:', cvv);
      console.log('Cardholder Name:', cardholderName);
      Alert.alert('Éxito', 'Pago realizado con éxito');
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Pago de Boletos</Card.Title>
        <Card.Divider />
        <Text style={styles.movieDetails}>Pelicula: {title}</Text>
        <Text style={styles.movieDetails}>Horario: {horario}</Text>
        <Text style={styles.movieDetails}>Número de boletos: {tickets}</Text>
        <Text style={styles.movieDetails}>Asientos: {seats.join(', ')}</Text>
        <Text style={styles.movieDetails}>Total a pagar: ${price}</Text>
        <Card.Divider />
        <Input
          placeholder="Número de tarjeta"
          leftIcon={<Icon name="credit-card" size={20} color="#E50914" />}
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          placeholder="Fecha de expiración (MM/AA)"
          leftIcon={<Icon name="calendar" size={20} color="#E50914" />}
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          placeholder="CVV"
          leftIcon={<Icon name="lock" size={20} color="#E50914" />}
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          placeholder="Nombre del titular"
          leftIcon={<Icon name="user" size={20} color="#E50914" />}
          value={cardholderName}
          onChangeText={setCardholderName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar Pago"
            buttonStyle={styles.button}
            onPress={handlePayment}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancelar"
            buttonStyle={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          />
          
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2D3E50',
    padding: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 20,
    textAlign: 'center',
  },
  movieDetails: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%', // Ajustar para que los botones ocupen el mismo ancho
  },
  cancelButton: {
    backgroundColor: '#888',
  },
});

export default PaymentScreen;
