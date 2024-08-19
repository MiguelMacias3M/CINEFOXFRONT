import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrCodeScreen = ({ route, navigation }) => {
  const { asiento, sala, total, fecha } = route.params;

  const qrData = {
    asiento,
    sala,
    total,
    fecha,
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Tu código QR</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={JSON.stringify(qrData)}
          size={200}
          backgroundColor="white"
          color="#2D3E50"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Asiento: {asiento}</Text>
        <Text style={styles.infoText}>Sala: {sala}</Text>
        <Text style={styles.infoText}>Total: ${total}</Text>
        <Text style={styles.infoText}>Hora: {fecha}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3C58',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#E5E5E5',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QrCodeScreen;
