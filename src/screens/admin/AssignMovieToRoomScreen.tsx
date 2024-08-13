import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getSalas } from '../../apiService'; // Importa la función para obtener las salas

type AssignMovieToRoomScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AssignMovieToRoom'>;
type AssignMovieToRoomScreenRouteProp = RouteProp<RootStackParamList, 'AssignMovieToRoom'>;

type Props = {
  navigation: AssignMovieToRoomScreenNavigationProp;
  route: AssignMovieToRoomScreenRouteProp;
};

const AssignMovieToRoomScreen: React.FC<Props> = ({ navigation, route }) => {
  const { movieId } = route.params;
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const data = await getSalas();
      console.log('Salas recibidas:', data);
      setSalas(data);
    } catch (error) {
      console.error('Error al obtener las salas:', error);
      Alert.alert('Error', 'No se pudieron cargar las salas');
    }
  };

  const handleSelectRoom = (roomId: string) => {
    navigation.navigate('SetRoomSchedule', { movieId, roomId });
  };

  const renderRoom = ({ item }) => (
    <TouchableOpacity style={styles.roomButton} onPress={() => handleSelectRoom(item.idSala)}>
      <Text style={styles.roomButtonText}>{item.nombreSala}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Película a Sala</Text>
      <FlatList
        data={salas}
        renderItem={renderRoom}
        keyExtractor={item => item.idSala.toString()}
        contentContainerStyle={styles.listContainer}
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
  roomButton: {
    backgroundColor: '#1A252F',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  roomButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default AssignMovieToRoomScreen;
