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
      console.log(`Fetching cartelera for day: ${day}`);
      const data = await getCarteleraPorDia(day);
      console.log('Cartelera data:', data);
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
      console.log("handlePressMovie - Item seleccionado:", item);
      console.log("handlePressMovie - Horarios antes de filtrar:", item.horarios);

      const horarios = Array.isArray(item.horarios) 
        ? uniqueHorarios(item.horarios) 
        : item.horarios 
          ? [item.horarios] 
          : [];

      console.log("handlePressMovie - Horarios únicos filtrados:", horarios);

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
      <Text style={styles.welcomeSubtitle}>Bienvenido a la cartelera de Cine-Fox</Text>
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
          keyExtractor={(item, index) => item.pelicula.nombrePelicula + '-' + index} // Se usa una combinación única
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
  },
  submenu: {
    marginBottom: 10,
  },
  submenuItem: {
    fontSize: 16,
    padding: 10,
  },
  selectedSubmenuItem: {
    fontWeight: 'bold',
    color: 'blue',
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  noImageText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  movieInfo: {
    marginTop: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDescription: {
    fontSize: 14,
    color: '#555',
  },
  moviesContainer: {
    flexGrow: 1,
  },
  noMoviesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default CarteleraScreen;
