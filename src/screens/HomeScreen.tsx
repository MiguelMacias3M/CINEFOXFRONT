import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const peliculas = [
  { title: 'Star Wars', image: require('../assets/avengers.jpg') },
  { title: 'Avatar', image: require('../assets/intensamente.jpg') },
  { title: 'El Cadaver de la Novia', image: require('../assets/ironman.jpg') },
  { title: 'Ironman', image: require('../assets/ironman.jpg') },
  { title: 'Los Increíbles 2', image: require('../assets/quabtumania.jpg') },
  { title: 'Ted', image: require('../assets/quabtumania.jpg') },
];

const estrenos = [
  { title: 'Star Wars', image: require('../assets/avengers.jpg') },
  { title: 'Avatar', image: require('../assets/intensamente.jpg') },
  { title: 'El Cadaver de la Novia', image: require('../assets/ironman.jpg') },
  { title: 'Ironman', image: require('../assets/ironman.jpg') },
  { title: 'Los Increíbles 2', image: require('../assets/quabtumania.jpg') },
  { title: 'Ted', image: require('../assets/quabtumania.jpg') },
];

const HomeScreen: React.FC = () => {
  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <Image source={item.image} style={styles.movieImage} />
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>Bienvenido a Cine-Fox</Text>
      </View>
      <Text style={styles.subtitle}>Mira los próximos estrenos</Text>
      <FlatList
        horizontal
        data={peliculas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesContainer}
      />
      <Text style={styles.subtitle}>Estrenos</Text>
      <FlatList
        horizontal
        data={estrenos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesContainer}
      />
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>Ver más...</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2D3E50',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  moviesContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 200,
    backgroundColor: '#2D3E50',
    borderWidth: 0,
    marginHorizontal: 10,
  },
  movieImage: {
    width: '100%',
    height: 280,
    borderRadius: 10,
  },
  moreButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  moreButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
