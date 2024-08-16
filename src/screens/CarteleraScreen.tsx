import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación
import { getCarteleraPorDia } from '../apiService'; // Importa la función desde tu apiService

const CarteleraScreen = () => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation(); // Obtén acceso a la navegación

  useEffect(() => {
    fetchCartelera(selectedDay);
  }, [selectedDay]);

  const fetchCartelera = async (day) => {
    try {
      console.log(`Fetching cartelera for day: ${day}`);
      const data = await getCarteleraPorDia(day);
      console.log('Cartelera data:', data); // Verifica los datos recibidos
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
    if (!Array.isArray(horarios)) return []; // Asegurarse de que horarios sea un array
    const seen = new Set();
    return horarios.filter((horario) => {
      const isDuplicate = seen.has(horario.horaProgramada);
      seen.add(horario.horaProgramada);
      return !isDuplicate;
    });
  };

  const renderMovieItem = ({ item }) => {
    if (!item.Pelicula) {
      return null; // Si item.Pelicula es null o undefined, no renderizar nada
    }

    const imageUrl = item.Pelicula.imagenPelicula 
      ? `https://apiboletos.onrender.com/${item.Pelicula.imagenPelicula}`
      : null;

  //  const horarios = uniqueHorarios(item.Horario || []); // Asegurarse de que Horario sea un array
  const handlePressMovie = () => {
    console.log("handlePressMovie - Item seleccionado:", item);
    console.log("handlePressMovie - Horarios antes de filtrar:", item.Horario);
  
    // Verificar si item.Horario es un array o un objeto individual
    const horarios = Array.isArray(item.Horario) 
      ? uniqueHorarios(item.Horario) 
      : item.Horario 
        ? [item.Horario] 
        : [];
  
    console.log("handlePressMovie - Horarios únicos filtrados:", horarios);
  
    navigation.navigate('MovieDetail', {
      title: item.Pelicula.nombrePelicula || 'Título no disponible',
      image: imageUrl ? { uri: imageUrl } : null,
      description: item.Pelicula.descripcion || 'Descripción no disponible',
      horarios: horarios.length > 0 ? horarios : ["No hay horarios disponibles"],
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
            <Text style={styles.movieTitle}>{item.Pelicula.nombrePelicula || 'Título no disponible'}</Text>
            <Text style={styles.movieDescription}>{item.Pelicula.descripcion || 'Descripción no disponible'}</Text>
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
          keyExtractor={(item) => item.idCartelera.toString()}
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
    backgroundColor: '#2D3E50',
    padding: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  submenu: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  submenuItem: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 10,
  },
  selectedSubmenuItem: {
    fontWeight: 'bold',
    color: '#E50914',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  moviesContainer: {
    paddingBottom: 20,
  },
  noMoviesText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#1A252F',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  noImageText: {
    color: '#BBBBBB',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  movieDescription: {
    fontSize: 16,
    color: '#BBBBBB',
    marginTop: 5,
  },
});

export default CarteleraScreen;
