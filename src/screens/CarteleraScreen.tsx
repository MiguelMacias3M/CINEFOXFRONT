import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CarteleraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cartelera'>;

type Props = {
  navigation: CarteleraScreenNavigationProp;
};

const estrenos = {
  Lunes: [
    {
      title: 'Deadpool & Wolverine',
      image: require('../assets/deadpool.jpg'),
      description: 'Tu super heroe esta devuelta...',
    },
    {
      title: 'Intensamente',
      image: require('../assets/intensamente.jpg'),
      description: 'Explora tu emociones...',
    },
    {
      title: 'Mi villano favorito 4',
      image: require('../assets/mivillanofavorito.jpg'),
      description: 'Tu villano favorito volvio!!!',
    },
    {
      title: 'Harold y su lapiz magico',
      image: require('../assets/harold.jpg'),
      description: 'Harol trasa tu mundo...',
    },
  ],
  Martes: [
    {
      title: 'El Cadaver de la Novia',
      image: require('../assets/elcadavernovia.jpeg'),
      description: 'Una historia de amor más allá de la muerte...',
    },
    {
      title: 'Deadpool & Wolverine',
      image: require('../assets/deadpool.jpg'),
      description: 'Tu super heroe esta devuelta...',
    },
    {
      title: 'Harold y su lapiz magico',
      image: require('../assets/harold.jpg'),
      description: 'Harol trasa tu mundo...',
    },
  ],
  Miércoles: [
    {
      title: 'Mi villano favorito 4',
      image: require('../assets/mivillanofavorito.jpg'),
      description: 'Tu villano favorito volvio!!!',
    },
    {
      title: 'Quabtumania',
      image: require('../assets/quabtumania.jpg'),
      description: 'El agua en su explendor de ...',
    },
  ],
  Jueves: [
    {
      title: 'Deadpool & Wolverine',
      image: require('../assets/deadpool.jpg'),
      description: 'Tu super heroe esta devuelta...',
    },
    {
      title: 'Intensamente',
      image: require('../assets/intensamente.jpg'),
      description: 'Explora tu emociones...',
    },
    {
      title: 'Mi villano favorito 4',
      image: require('../assets/mivillanofavorito.jpg'),
      description: 'Tu villano favorito volvio!!!',
    },
    {
      title: 'Harold y su lapiz magico',
      image: require('../assets/harold.jpg'),
      description: 'Harol trasa tu mundo...',
    },
  ],
  Viernes: [
    {
      title: 'Deadpool & Wolverine',
      image: require('../assets/deadpool.jpg'),
      description: 'Tu super heroe esta devuelta...',
    },
    {
      title: 'Intensamente',
      image: require('../assets/intensamente.jpg'),
      description: 'Explora tu emociones...',
    },
    {
      title: 'Mi villano favorito 4',
      image: require('../assets/mivillanofavorito.jpg'),
      description: 'Tu villano favorito volvio!!!',
    },
    {
      title: 'Harold y su lapiz magico',
      image: require('../assets/harold.jpg'),
      description: 'Harol trasa tu mundo...',
    },
  ],
  Sábado: [
    {
      title: 'Deadpool & Wolverine',
      image: require('../assets/deadpool.jpg'),
      description: 'Tu super heroe esta devuelta...',
    },
    {
      title: 'Intensamente',
      image: require('../assets/intensamente.jpg'),
      description: 'Explora tu emociones...',
    },
    {
      title: 'Mi villano favorito 4',
      image: require('../assets/mivillanofavorito.jpg'),
      description: 'Tu villano favorito volvio!!!',
    },
    {
      title: 'Harold y su lapiz magico',
      image: require('../assets/harold.jpg'),
      description: 'Harol trasa tu mundo...',
    },
  ],
  Domingo: [],
};

const daysOfWeek = Object.keys(estrenos);

const CarteleraScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);

  const renderDayItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedDay(item)}>
      <Text style={[styles.submenuItem, selectedDay === item && styles.selectedSubmenuItem]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handlePressMovie = (movie) => {
    navigation.navigate('MovieDetail', movie);
  };

  const renderMovieItem = (movie, index) => (
    <TouchableOpacity key={index} onPress={() => handlePressMovie(movie)}>
      <View style={styles.card}>
        <Image source={movie.image} style={styles.movieImage} />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDescription}>{movie.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeSubtitle}>Bienvenido a la cartelera de Cine-Fox</Text>
      <FlatList
        horizontal
        data={daysOfWeek}
        renderItem={renderDayItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.submenu}
      />
      <Text style={styles.subtitle}>Estrenos de {selectedDay}</Text>
      <View style={styles.moviesContainer}>
        {estrenos[selectedDay] && estrenos[selectedDay].length > 0 ? (
          estrenos[selectedDay].map(renderMovieItem)
        ) : (
          <Text style={styles.noMoviesText}>No hay estrenos para este día.</Text>
        )}
      </View>
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
    flexGrow: 1,
    justifyContent: 'center',
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
  noMoviesText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CarteleraScreen;
