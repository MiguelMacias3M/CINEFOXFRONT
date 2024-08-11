import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type MovieManagementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieManagement'>;

type Props = {
  navigation: MovieManagementScreenNavigationProp;
};

const movies = [
  { id: '1', title: 'Wolverine', description: 'Acción y aventura.' },
  { id: '2', title: 'Intensamente 2', description: 'Animación y comedia.' },
  { id: '3', title: 'Mi villano favorito', description: 'Animación y comedia.' },
];

const MovieManagementScreen: React.FC<Props> = ({ navigation }) => {

  const handleAssignMovie = (movieId: string) => {
    navigation.navigate('AssignMovieToRoom', { movieId });
  };

  const renderMovie = ({ item }) => (
    <View style={styles.movieCard}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.assignButton} onPress={() => handleAssignMovie(item.id)}>
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
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Agregar Nueva Película"
        onPress={() => navigation.navigate('MovieForm')}
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
