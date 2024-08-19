import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPeliculas, deletePelicula } from '../../apiService'; // Importa las funciones necesarias

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

  const handleEditMovie = (movie) => {
    navigation.navigate('EditMovie', {
      movieId: movie.idPelicula,
      nombrePelicula: movie.nombrePelicula,
      descripcion: movie.descripcion,
      fechaDeEmision: movie.fechaDeEmision,
      horaProgramada: movie.horaProgramada,
      turno: movie.turno,
    });
  };
  

  const handleDeleteMovie = async (movieId: string) => {
    Alert.alert(
      'Eliminar Película',
      '¿Estás seguro de que deseas eliminar esta película?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deletePelicula(movieId);
              Alert.alert('Película eliminada', 'La película ha sido eliminada correctamente.');
              fetchMovies(); // Recargar las películas después de eliminar una
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la película');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderMovie = ({ item }) => {
    // Imprime la URL completa de la imagen para depuración
    console.log(`Imagen URL: https://apiboletos.onrender.com/${item.imagenPelicula}`);
    
    // Imprime el objeto 'item' completo para ver sus propiedades
    console.log(item);
  
    return (
      <View style={styles.movieCard}>
        {item.imagenPelicula ? (
        <Image
        source={{ uri: `https://apiboletos.onrender.com/${item.imagenPelicula}` }}
        style={styles.movieImage}
        onError={(error) => {
          console.log('Error al cargar la imagen:', error.nativeEvent.error);
          // Aquí puedes manejar el error, por ejemplo, mostrando una imagen alternativa
        }}
      />
       
       
        
        ) : (
          <Text style={styles.noImageText}>Imagen no disponible</Text>
        )}
        <Text style={styles.movieTitle}>{item.nombrePelicula}</Text>
        <Text style={styles.movieDetails}>Actores: {item.actoresPelicula}</Text>
        <Text style={styles.movieDetails}>Duracion: {item.duracionPelicula} min</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.assignButton} onPress={() => handleAssignMovie(item.idPelicula)}>
            <Text style={styles.assignButtonText}>Asignar a Sala</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.editButton} onPress={() => handleEditMovie(item)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMovie(item.idPelicula)}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  

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
        color="#ff8100"
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
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImageText: {
    color: '#BBBBBB',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  movieDetails: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  editButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MovieManagementScreen;
