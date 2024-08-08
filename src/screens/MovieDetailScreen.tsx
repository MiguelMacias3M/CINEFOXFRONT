import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type MovieDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;
type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

type Props = {
  navigation: MovieDetailScreenNavigationProp;
  route: MovieDetailScreenRouteProp;
};

const horarios = ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];

const MovieDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { title, image, description } = route.params;
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [tickets, setTickets] = useState(1);

  const renderHorario = (horario: string) => (
    <TouchableOpacity
      key={horario}
      style={[styles.horarioButton, selectedHorario === horario && styles.selectedHorarioButton]}
      onPress={() => setSelectedHorario(horario)}
    >
      <Text style={styles.horarioButtonText}>{horario}</Text>
    </TouchableOpacity>
  );

  const handleContinue = () => {
    if (selectedHorario && tickets > 0) {
      navigation.navigate('SeatSelection', { title, horario: selectedHorario, tickets });
    } else {
      alert('Seleccione un horario y el número de boletos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{title}</Text>
      <Text style={styles.movieDescription}>{description}</Text>
      <Text style={styles.subtitle}>Horarios Disponibles</Text>
      <View style={styles.horariosContainer}>
        {horarios.map(renderHorario)}
      </View>
      <Text style={styles.subtitle}>Número de boletos</Text>
      <View style={styles.ticketsContainer}>
        <TouchableOpacity onPress={() => setTickets(tickets > 1 ? tickets - 1 : 1)} style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.ticketCount}>{tickets}</Text>
        <TouchableOpacity onPress={() => setTickets(tickets + 1)} style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceText}>Precio: ${tickets * 80}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2D3E50',
    padding: 16,
    alignItems: 'center',
  },
  movieImage: {
    width: '60%',
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 16,
    color: '#BBBBBB',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  horarioButton: {
    backgroundColor: '#E50914',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  selectedHorarioButton: {
    backgroundColor: 'orange',
  },
  horarioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  ticketsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  ticketButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  ticketCount: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MovieDetailScreen;
