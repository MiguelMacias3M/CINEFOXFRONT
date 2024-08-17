import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

const MovieDetailScreen = ({ route, navigation }) => {
  const { title, image, description, horarios, sala } = route.params;
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [tickets, setTickets] = useState(1);

  const MAX_TICKETS = 35;  // Definir el máximo de boletos

  // Función para generar horarios predeterminados
  const generateDefaultHorarios = () => {
    return [
      { horaProgramada: '10:00 AM' },
      { horaProgramada: '1:00 PM' },
      { horaProgramada: '4:00 PM' },
      { horaProgramada: '7:00 PM' },
    ];
  };

  // Verificar si hay horarios, si no, generar predeterminados
  const availableHorarios = horarios && horarios.length > 0 ? horarios : generateDefaultHorarios();

  useEffect(() => {
    console.log("MovieDetailScreen - route.params:", route.params);
    console.log("MovieDetailScreen - title:", title);
    console.log("MovieDetailScreen - image:", image);
    console.log("MovieDetailScreen - description:", description);
    console.log("MovieDetailScreen - horarios:", availableHorarios);
    console.log("MovieDetailScreen - sala:", sala || 'Sala no disponible');
  }, []);

  const renderHorario = (horario) => (
    <TouchableOpacity
      key={horario.horaProgramada}  // Usar un identificador único si lo tienes
      style={[styles.horarioButton, selectedHorario === horario.horaProgramada && styles.selectedHorarioButton]}
      onPress={() => setSelectedHorario(horario.horaProgramada)}
    >
      <Text style={styles.horarioButtonText}>{horario.horaProgramada}</Text>
    </TouchableOpacity>
  );

  const handleContinue = () => {
    console.log("Selected Horario:", selectedHorario);
    console.log("Tickets:", tickets);
    
    if (selectedHorario && tickets > 0) {
      navigation.navigate('SeatSelection', { title, horario: selectedHorario, tickets });
    } else {
      Alert.alert('Error', 'Seleccione un horario y el número de boletos.');
    }
  };

  const handleIncreaseTickets = () => {
    if (tickets < MAX_TICKETS) {
      setTickets(tickets + 1);
    } else {
      Alert.alert('Límite alcanzado', `No puedes comprar más de ${MAX_TICKETS} boletos.`);
    }
  };

  const handleDecreaseTickets = () => {
    if (tickets > 1) {
      setTickets(tickets - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image ? (
        <Image
          source={image}
          style={styles.movieImage}
          onError={(error) => console.log('Error al cargar la imagen:', error.nativeEvent)}
        />
      ) : (
        <Text style={styles.noImageText}>Imagen no disponible</Text>
      )}
      <Text style={styles.movieTitle}>{title}</Text>
      <Text style={styles.movieDescription}>{description}</Text>
      <Text style={styles.subtitle}>Sala: {sala || 'Sala no disponible'}</Text>
      <Text style={styles.subtitle}>Horarios Disponibles</Text>
      <View style={styles.horariosContainer}>
        {availableHorarios.map(renderHorario)}
      </View>
      <Text style={styles.subtitle}>Número de boletos</Text>
      <View style={styles.ticketsContainer}>
        <TouchableOpacity onPress={handleDecreaseTickets} style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.ticketCount}>{tickets}</Text>
        <TouchableOpacity onPress={handleIncreaseTickets} style={styles.ticketButton}>
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
    textAlign: 'center',
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
  noImageText: {
    color: '#BBBBBB',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
