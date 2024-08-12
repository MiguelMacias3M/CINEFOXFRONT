import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa desde el nuevo paquete
import { createMovie, getHorarios } from '../../apiService'; // Ajusta la ruta de importación según tu estructura

const MovieFormScreen = ({ navigation }) => {
  const [nombrePelicula, setNombrePelicula] = useState('');
  const [directorPelicula, setDirectorPelicula] = useState('');
  const [duracionPelicula, setDuracionPelicula] = useState('');
  const [actoresPelicula, setActoresPelicula] = useState('');
  const [clasificacionPelicula, setClasificacionPelicula] = useState('');
  const [idHorario, setIdHorario] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [precioBoleto, setPrecioBoleto] = useState('');

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const data = await getHorarios();
      setHorarios(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los horarios');
    }
  };

  const handleSubmit = async () => {
    try {
      await createMovie(
        nombrePelicula,
        directorPelicula,
        parseInt(duracionPelicula),
        actoresPelicula,
        clasificacionPelicula,
        parseInt(idHorario),
        parseFloat(precioBoleto)
      );
      Alert.alert('Éxito', 'Película creada correctamente');
      navigation.goBack(); // Vuelve a la pantalla anterior después de crear la película
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la película');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Película</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la Película"
        value={nombrePelicula}
        onChangeText={setNombrePelicula}
      />

      <TextInput
        style={styles.input}
        placeholder="Director"
        value={directorPelicula}
        onChangeText={setDirectorPelicula}
      />

      <TextInput
        style={styles.input}
        placeholder="Duración (minutos)"
        value={duracionPelicula}
        onChangeText={setDuracionPelicula}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Actores"
        value={actoresPelicula}
        onChangeText={setActoresPelicula}
      />

      <TextInput
        style={styles.input}
        placeholder="Clasificación"
        value={clasificacionPelicula}
        onChangeText={setClasificacionPelicula}
      />

      <Picker
        selectedValue={idHorario}
        onValueChange={(itemValue) => setIdHorario(itemValue)}
      >
        {horarios.map((horario) => (
          <Picker.Item key={horario.idHorario} label={`Hora: ${horario.horaProgramada} - Fecha: ${horario.fechaDeEmision}`} value={horario.idHorario} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Precio del Boleto"
        value={precioBoleto}
        onChangeText={setPrecioBoleto}
        keyboardType="numeric"
      />

      <Button title="Crear Película" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default MovieFormScreen;
