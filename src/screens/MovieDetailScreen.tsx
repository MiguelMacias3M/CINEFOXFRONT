import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
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
const maxTickets = 10;

const MovieDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { title, image, description } = route.params;
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [tickets, setTickets] = useState<number>(1);

  const handleHorarioPress = (horario: string) => {
    setSelectedHorario(horario);
  };

  const handleTicketChange = (change: number) => {
    setTickets(prev => {
      const newTickets = prev + change;
      return newTickets > 0 && newTickets <= maxTickets ? newTickets : prev;
    });
  };

  const handleNext = () => {
    if (selectedHorario) {
      navigation.navigate('SeatSelection', { title, horario: selectedHorario, tickets });
    } else {
      alert('Por favor, seleccione un horario.');
    }
  };

  const renderHorario = (horario: string) => (
    <TouchableOpacity key={horario} style={[styles.horarioButton, selectedHorario === horario && styles.selectedHorarioButton]} onPress={() => handleHorarioPress(horario)}>
      <Text style={styles.horarioButtonText}>{horario}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{title}</Text>
      <Text style={styles.movieDescription}>{description}</Text>
      <Text style={styles.subtitle}>Horarios Disponibles</Text>
      <View style={styles.horariosContainer}>
        {horarios.map(renderHorario)}
      </View>
      <Text style={styles.subtitle}>Seleccione el número de boletos</Text>
      <View style={styles.ticketContainer}>
        <TouchableOpacity style={styles.ticketButton} onPress={() => handleTicketChange(-1)}>
          <Text style={styles.ticketButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.ticketCount}>{tickets}</Text>
        <TouchableOpacity style={styles.ticketButton} onPress={() => handleTicketChange(1)}>
          <Text style={styles.ticketButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Siguiente</Text>
      </TouchableOpacity>
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
    backgroundColor: '#A00000',
  },
  horarioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  ticketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  ticketButton: {
    backgroundColor: '#E50914',
    padding: 10,
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
  nextButton: {
    backgroundColor: '#E50914',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MovieDetailScreen;
