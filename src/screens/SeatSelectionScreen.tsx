import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { getAsientosBySala, updateAsientos } from '../apiService'; // Asegúrate de tener la función updateAsientos
import { RootStackParamList } from '../navigation/AppNavigator';

type SeatSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SeatSelection'>;
type SeatSelectionScreenRouteProp = RouteProp<RootStackParamList, 'SeatSelection'>;

type Props = {
  navigation: SeatSelectionScreenNavigationProp;
  route: SeatSelectionScreenRouteProp;
};

const SeatSelectionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { title, horario, tickets, idSala } = route.params;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [availableSeats, setAvailableSeats] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        console.log("Iniciando fetchAsientosBySala...");
        const asientos = await getAsientosBySala(idSala);
        console.log("Asientos recibidos:", asientos);

        setAvailableSeats(asientos);
      } catch (error) {
        console.error("Error al obtener los asientos:", error);
        Alert.alert('Error', 'No se pudieron cargar los asientos');
      }
    };

    fetchAsientos();
  }, [idSala]);

  const toggleSeatSelection = (seat: any) => {
    const seatLabel = `${seat.filaAsiento}-${seat.numeroAsiento}`;
    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatLabel));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seatLabel]);
      } else {
        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats.shift();
        newSelectedSeats.push(seatLabel);
        setSelectedSeats(newSelectedSeats);
      }
    }
  };

  const handleConfirm = async () => {
    try {
      const asientosParaActualizar = selectedSeats.map(seatLabel => {
        const [filaAsiento, numeroAsiento] = seatLabel.split('-');
        const asiento = availableSeats.find(asiento => 
          asiento.filaAsiento === filaAsiento && asiento.numeroAsiento === parseInt(numeroAsiento)
        );
        return {
          idAsiento: asiento.idAsiento,
          filaAsiento: asiento.filaAsiento,
          idSalaAsiento: asiento.idSalaAsiento,
          estadoAsiento: 'ocupado'
        };
      });

      console.log("Enviando asientos para actualizar:", asientosParaActualizar);
      await updateAsientos(asientosParaActualizar);

      Alert.alert('Éxito', 'Asientos actualizados correctamente');
      setModalVisible(true);
    } catch (error) {
      console.error("Error al actualizar los asientos:", error);
      Alert.alert('Error', 'No se pudieron actualizar los asientos');
    }
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
        {availableSeats.map(seat => (
          <View key={`${seat.idSalaAsiento}-${seat.filaAsiento}-${seat.numeroAsiento}`} style={styles.seatWrapper}>
            <TouchableOpacity
              style={styles.seat}
              onPress={() => toggleSeatSelection(seat)}
              disabled={seat.estadoAsiento === 'ocupado'}
            >
              <Image
                source={selectedSeats.includes(`${seat.filaAsiento}-${seat.numeroAsiento}`) ? require('../assets/asientoRojo.png') : require('../assets/asientoBlanco.png')}
                style={styles.seatImage}
              />
            </TouchableOpacity>
            <Text style={styles.seatLabel}>{seat.filaAsiento}-{seat.numeroAsiento}</Text>
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
    color: '#000000',
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
    color: 'white',
    fontSize: 16,
  },
});

export default SeatSelectionScreen;
