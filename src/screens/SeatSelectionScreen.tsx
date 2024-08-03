import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Seleccione sus asientos</Text>
      <View style={styles.seatContainer}>
        {seats.map(seat => (
          <TouchableOpacity
            key={seat}
            style={[styles.seat, selectedSeats.includes(seat) && styles.selectedSeat]}
            onPress={() => toggleSeatSelection(seat)}
          >
            <Text style={styles.seatText}>{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedSeatsText}>Asientos seleccionados: {selectedSeats.length}/{tickets}</Text>
      <Text style={styles.selectedSeatsList}>Asientos: {selectedSeats.join(', ')}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {/* Lógica para confirmar la selección */}}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
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
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: 40,
    alignItems: 'center',
  },
  selectedSeat: {
    backgroundColor: '#E50914',
  },
  seatText: {
    color: '#2D3E50',
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
});

export default SeatSelectionScreen;
