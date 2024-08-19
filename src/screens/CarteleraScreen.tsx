import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCarteleraPorDia } from '../apiService';

const CarteleraScreen = () => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCartelera(selectedDay);
  }, [selectedDay]);

  const fetchCartelera = async (day) => {
    try {
      const data = await getCarteleraPorDia(day);
      if (data && Array.isArray(data)) {
        setMovies(data);
      } else {
        setMovies([]);
        console.error('La respuesta de la API no es un array o está vacía');
      }
    } catch (error) {
      console.error('Error fetching cartelera:', error);
      Alert.alert('Error', `Error al obtener la cartelera para el día ${day}: ${error.message}`);
    }
  };

  const uniqueHorarios = (horarios) => {
    if (!Array.isArray(horarios)) return [];
    const seen = new Set();
    return horarios.filter((horario) => {
      const isDuplicate = seen.has(horario.horaProgramada);
      seen.add(horario.horaProgramada);
      return !isDuplicate;
    });
  };

  const renderMovieItem = ({ item, index }) => {
    if (!item.pelicula) {
      return null;
    }

    const imageUrl = item.pelicula.imagenPelicula 
      ? `https://apiboletos.onrender.com/${item.pelicula.imagenPelicula}`
      : null;

    const handlePressMovie = () => {
      const horarios = Array.isArray(item.horarios) 
        ? uniqueHorarios(item.horarios) 
        : item.horarios 
          ? [item.horarios] 
          : [];

      navigation.navigate('MovieDetail', {
        title: item.pelicula.nombrePelicula || 'Título no disponible',
        image: imageUrl ? { uri: imageUrl } : null,
        description: item.pelicula.descripcion || 'Descripción no disponible',
        horarios: horarios.length > 0 ? horarios : ["No hay horarios disponibles"],
        sala: item.horarios.length > 0 ? item.horarios[0].nombreSala || 'Sala no disponible' : 'Sala no disponible',
      });
    };

    return (
      <TouchableOpacity onPress={handlePressMovie}>
        <View style={styles.card}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.movieImage}
              onError={(error) => console.log('Error al cargar la imagen:', error.nativeEvent)}
            />
          ) : (
            <Text style={styles.noImageText}>Imagen no disponible</Text>
          )}
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{item.pelicula.nombrePelicula || 'Título no disponible'}</Text>
            <Text style={styles.movieDescription}>{item.pelicula.descripcion || 'Descripción no disponible'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDayItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedDay(item)}>
      <Text style={[styles.submenuItem, selectedDay === item && styles.selectedSubmenuItem]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cartelera</Text>
        
      </View>
      <FlatList
        horizontal
        data={['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']}
        renderItem={renderDayItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.submenu}
      />
      <Text style={styles.subtitle}>Estrenos de {selectedDay}</Text>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item, index) => item.pelicula.nombrePelicula + '-' + index}
          contentContainerStyle={styles.moviesContainer}
        />
      ) : (
        <Text style={styles.noMoviesText}>No hay películas disponibles para {selectedDay}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1A3C58',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20, // Hace que la imagen sea redonda
    marginLeft: 10,
  },
  submenu: {
    marginBottom: 10,
    backgroundColor: '#2B4F70',
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submenuItem: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#E5E5E5',
  },
  selectedSubmenuItem: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#41698A',
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#E5E5E5',
  },
  card: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#315470',
    borderRadius: 10,
    backgroundColor: '#2B4F70',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  noImageText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    paddingVertical: 50,
  },
  movieInfo: {
    marginTop: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  movieDescription: {
    fontSize: 14,
    color: '#E5E5E5',
  },
  moviesContainer: {
    flexGrow: 1,
  },
  noMoviesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#E5E5E5',
  },
});

export default CarteleraScreen;
