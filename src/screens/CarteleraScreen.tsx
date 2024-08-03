import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const estrenos = {
  Lunes: [
    {
      title: 'Star Wars',
      image: require('../assets/avengers.jpg'),
      description: 'Una galaxia muy, muy lejana...',
    },
    {
      title: 'Avatar',
      image: require('../assets/intensamente.jpg'),
      description: 'Explora el mundo de Pandora...',
    },
  ],
  Martes: [
    {
      title: 'El Cadaver de la Novia',
      image: require('../assets/ironman.jpg'),
      description: 'Una historia de amor más allá de la muerte...',
    },
    {
      title: 'Ironman',
      image: require('../assets/ironman.jpg'),
      description: 'El héroe de hierro...',
    },
  ],
  Miércoles: [
    {
      title: 'Los Increíbles 2',
      image: require('../assets/quabtumania.jpg'),
      description: 'La familia de superhéroes regresa...',
    },
    {
      title: 'Ted',
      image: require('../assets/quabtumania.jpg'),
      description: 'La historia del oso de peluche más irreverente...',
    },
  ],
  Jueves: [],
  Viernes: [],
  Sábado: [],
  Domingo: [],
};

const daysOfWeek = Object.keys(estrenos);

const CarteleraScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);

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
        data={daysOfWeek}
        renderItem={renderDayItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.submenu}
      />
      <Text style={styles.subtitle}>Estrenos de {selectedDay}</Text>
      <View style={styles.moviesContainer}>
        {estrenos[selectedDay] && estrenos[selectedDay].length > 0 ? (
          estrenos[selectedDay].map((estreno, index) => (
            <View key={index} style={styles.card}>
              <Image source={estreno.image} style={styles.movieImage} />
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{estreno.title}</Text>
                <Text style={styles.movieDescription}>{estreno.description}</Text>
              </View>
            </View>
          ))
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
