import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { updatePelicula } from '../../apiService';

type EditMovieScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditMovie'>;
type EditMovieScreenRouteProp = RouteProp<RootStackParamList, 'EditMovie'>;

type Props = {
  navigation: EditMovieScreenNavigationProp;
  route: EditMovieScreenRouteProp;
};

const EditMovieScreen: React.FC<Props> = ({ navigation, route }) => {
  const { movieId, nombrePelicula, descripcion, fechaDeEmision, horaProgramada, turno } = route.params;

  const [titulo, setTitulo] = useState('');
  const [descripcionPelicula, setDescripcionPelicula] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [turnoPelicula, setTurnoPelicula] = useState('');

  // UseEffect para cargar los valores cuando la pantalla se monta
  useEffect(() => {
    console.log('Datos recibidos en EditMovieScreen:', {
      nombrePelicula,
      descripcion,
      fechaDeEmision, 
      horaProgramada,
      turno,
    });
  
    setTitulo(nombrePelicula);
    setDescripcionPelicula(descripcion);
    setFecha(fechaDeEmision);
    setHora(horaProgramada);
    setTurnoPelicula(turno);
  
    console.log('Estados actualizados:', {
      titulo,
      descripcionPelicula,
      fecha,
      hora,
      turnoPelicula,
    });
  }, [nombrePelicula, descripcion, fechaDeEmision, horaProgramada, turno]);
  

  const handleUpdateMovie = async () => {
    try {
      const updatedData = {
        nombrePelicula: titulo,
        descripcion: descripcionPelicula,
        fechaDeEmision: fecha,
        horaProgramada: hora,
        turno: turnoPelicula,
      };

      await updatePelicula(movieId, updatedData);
      Alert.alert('Éxito', 'Película actualizada correctamente');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la película');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Película</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcionPelicula}
        onChangeText={setDescripcionPelicula}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Emisión"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora Programada"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Turno"
        value={turnoPelicula}
        onChangeText={setTurnoPelicula}
      />
      <Button title="Actualizar Película" onPress={handleUpdateMovie} color="#E50914" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2D3E50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default EditMovieScreen;
