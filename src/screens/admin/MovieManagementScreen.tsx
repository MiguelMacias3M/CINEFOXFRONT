import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPeliculas } from '../../apiService'; // Importa la función para obtener las películas

type MovieManagementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieManagement'>;

type Props = {
  navigation: MovieManagementScreenNavigationProp;
};

const MovieManagementScreen: React.FC<Props> = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [])
  );

  const fetchMovies = async () => {
    try {
      const data = await getAllPeliculas();
      console.log('Películas recibidas:', data); // Para ver la respuesta de la API
      setMovies(data);
    } catch (error) {
      console.error('Error al obtener las películas:', error);
      Alert.alert('Error', 'No se pudieron cargar las películas');
    }
  };

  const handleAssignMovie = (movieId: string) => {
    navigation.navigate('AssignMovieToRoom', { movieId });
  };

  const handleAddMovie = () => {
    navigation.navigate('MovieForm'); // Navegar al formulario de películas
  };

  const renderMovie = ({ item }) => (
    <View style={styles.movieCard}>
      <Text style={styles.movieTitle}>{item.nombrePelicula}</Text>
      <Text style={styles.movieDescription}>{item.descripcion}</Text>
      <TouchableOpacity style={styles.assignButton} onPress={() => handleAssignMovie(item.idPelicula)}>
        <Text style={styles.assignButtonText}>Asignar a Sala</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Películas</Text>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={item => item.idPelicula.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Agregar Nueva Película"
        onPress={handleAddMovie}
        color="#E50914"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2D3E50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  movieCard: {
    backgroundColor: '#1A252F',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 10,
  },
  assignButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MovieManagementScreen;
