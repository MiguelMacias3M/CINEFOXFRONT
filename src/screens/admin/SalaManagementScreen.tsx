import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { getSalas, createSala, deleteSala } from '../../apiService';

const SalaManagementScreen = () => {
  const [nombreSala, setNombreSala] = useState('');
  const [cantidadAsientos, setCantidadAsientos] = useState('');
  const [cantidadFilas, setCantidadFilas] = useState('');
  const [maxAsientosPorFila, setMaxAsientosPorFila] = useState('');
  const [salas, setSalas] = useState([]);

  const cargarSalas = async () => {
    try {
      const data = await getSalas();
      setSalas(data);
    } catch (error) {
      console.error('Error al cargar salas:', error);
    }
  };

  const handleCrearSala = async () => {
    try {
      await createSala(nombreSala, parseInt(cantidadAsientos), parseInt(cantidadFilas), parseInt(maxAsientosPorFila));
      Alert.alert('Sala creada', 'La sala se ha creado exitosamente.');
      cargarSalas(); // Recargar la lista de salas
      setNombreSala('');
      setCantidadAsientos('');
      setCantidadFilas('');
      setMaxAsientosPorFila('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleEliminarSala = async (idSala: number) => {
    try {
      await deleteSala(idSala);
      Alert.alert('Sala eliminada', 'La sala se ha eliminado exitosamente.');
      cargarSalas(); // Recargar la lista de salas
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    cargarSalas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Salas</Text>
      
      <TextInput
        placeholder="Nombre de la Sala"
        value={nombreSala}
        onChangeText={setNombreSala}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad de Asientos"
        value={cantidadAsientos}
        onChangeText={setCantidadAsientos}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad de Filas"
        value={cantidadFilas}
        onChangeText={setCantidadFilas}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Max Asientos por Fila"
        value={maxAsientosPorFila}
        onChangeText={setMaxAsientosPorFila}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Crear Sala" onPress={handleCrearSala} />

      <FlatList
        data={salas}
        keyExtractor={(item) => item.idSala.toString()}
        renderItem={({ item }) => (
          <View style={styles.salaItem}>
            <Text style={styles.salaText}>{item.nombreSala} - {item.cantidadAsientos} asientos</Text>
            <Button title="Eliminar" onPress={() => handleEliminarSala(item.idSala)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  salaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  salaText: {
    fontSize: 18,
  },
});

export default SalaManagementScreen;
