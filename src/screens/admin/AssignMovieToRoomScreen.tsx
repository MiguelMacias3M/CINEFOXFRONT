import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type AssignMovieToRoomScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AssignMovieToRoom'>;
type AssignMovieToRoomScreenRouteProp = RouteProp<RootStackParamList, 'AssignMovieToRoom'>;

type Props = {
  navigation: AssignMovieToRoomScreenNavigationProp;
  route: AssignMovieToRoomScreenRouteProp;
};

const salas = [
  { id: '1', name: 'Sala 1' },
  { id: '2', name: 'Sala 2' },
  { id: '3', name: 'Sala 3' },
  { id: '4', name: 'Sala 4' },
  { id: '5', name: 'Sala 5' },
];

const AssignMovieToRoomScreen: React.FC<Props> = ({ navigation, route }) => {
  const { movieId } = route.params;

  const handleSelectRoom = (roomId: string) => {
    navigation.navigate('SetRoomSchedule', { movieId, roomId });
  };

  const renderRoom = ({ item }) => (
    <TouchableOpacity style={styles.roomButton} onPress={() => handleSelectRoom(item.id)}>
      <Text style={styles.roomButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Película a Sala</Text>
      <FlatList
        data={salas}
        renderItem={renderRoom}
        keyExtractor={item => item.id}
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
