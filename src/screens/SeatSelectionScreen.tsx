import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type SeatSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SeatSelection'>;
type SeatSelectionScreenRouteProp = RouteProp<RootStackParamList, 'SeatSelection'>;

type Props = {
  navigation: SeatSelectionScreenNavigationProp;
  route: SeatSelectionScreenRouteProp;
};

const SeatSelectionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { title, horario, tickets } = route.params;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const seats = [
    'A-1', 'A-2', 'A-3', 'A-4', 'A-5',
    'B-1', 'B-2', 'B-3', 'B-4', 'B-5',
    'C-1', 'C-2', 'C-3', 'C-4', 'C-5',
    'D-1', 'D-2', 'D-3', 'D-4', 'D-5',
    'E-1', 'E-2', 'E-3', 'E-4', 'E-5',
    'F-1', 'F-2', 'F-3', 'F-4', 'F-5',
    'G-1', 'G-2', 'G-3', 'G-4', 'G-5',
  ];

  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        // Si ya se ha alcanzado el número máximo de boletos, reemplazar el asiento más antiguo
        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats.shift(); // Elimina el asiento más antiguo
        newSelectedSeats.push(seat); // Añade el nuevo asiento
        setSelectedSeats(newSelectedSeats);
      }
    }
  };

  const handleConfirm = () => {
    setModalVisible(true);
  };

  const handleProceedToPayment = () => {
    setModalVisible(false);
    navigation.navigate('Payment', { title, horario, tickets, seats: selectedSeats, price: tickets * 80 });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Seleccione sus asientos</Text>
      <View style={styles.screenLabelContainer}>
        <Text style={styles.screenLabel}>Pantalla</Text>
      </View>
      <View style={styles.seatContainer}>
        {seats.map(seat => (
          <View key={seat} style={styles.seatWrapper}>
            <TouchableOpacity
              style={styles.seat}
              onPress={() => toggleSeatSelection(seat)}
            >
              <Image
                source={selectedSeats.includes(seat) ? require('../assets/asientoRojo.png') : require('../assets/asientoBlanco.png')}
                style={styles.seatImage}
              />
            </TouchableOpacity>
            <Text style={styles.seatLabel}>{seat}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.selectedSeatsText}>Asientos seleccionados: {selectedSeats.length}/{tickets}</Text>
      <Text style={styles.selectedSeatsList}>Asientos: {selectedSeats.join(', ')}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Resumen de la Venta</Text>
            <Text style={styles.modalText}>Pelicula: {title}</Text>
            <Text style={styles.modalText}>Horario: {horario}</Text>
            <Text style={styles.modalText}>Número de boletos: {tickets}</Text>
            <Text style={styles.modalText}>Asientos: {selectedSeats.join(', ')}</Text>
            <Text style={styles.modalText}>Precio total: ${tickets * 80}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleProceedToPayment}>
                <Text style={styles.modalButtonText}>Ir a Pago</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2D3E50',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  screenLabelContainer: {
    marginBottom: 20,
  },
  screenLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seatWrapper: {
    alignItems: 'center',
    margin: 5,
  },
  seat: {
    backgroundColor: '#2D3E50',
    borderRadius: 5,
    padding: 10,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatImage: {
    width: 30,
    height: 30,
  },
  seatLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },
  selectedSeatsText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
  },
  selectedSeatsList: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SeatSelectionScreen;
