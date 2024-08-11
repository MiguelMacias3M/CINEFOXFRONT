import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createHorario, getHorarios, updateHorario, deleteHorario } from '../../apiService';

const SetRoomScheduleScreen = () => {
  const [horaProgramada, setHoraProgramada] = useState('');
  const [turno, setTurno] = useState('');
  const [fechaDeEmision, setFechaDeEmision] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);

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
      const horarioData = {
        horaProgramada,  // Asegúrate de que este valor sea un string en formato "HH:MM:SS"
        turno,           // Asegúrate de que este valor sea un string (mañana, tarde, noche)
        fechaDeEmision,  // Asegúrate de que este valor sea un string en formato "YYYY-MM-DD"
      };
  
      if (selectedHorario) {
        // Si hay un horario seleccionado, actualizar
        await updateHorario(selectedHorario.idHorario, horarioData.horaProgramada, horarioData.turno, horarioData.fechaDeEmision);
        Alert.alert('Éxito', 'Horario actualizado correctamente');
      } else {
        // Si no, crear uno nuevo
        await createHorario(horarioData.horaProgramada, horarioData.turno, horarioData.fechaDeEmision);
        Alert.alert('Éxito', 'Horario creado correctamente');
      }
  
      fetchHorarios(); // Refrescar la lista de horarios
      clearForm();
    } catch (error) {
      Alert.alert('Error', 'No se pudo gestionar el horario');
    }
  };
  

  const handleDelete = async (idHorario) => {
    try {
      await deleteHorario(idHorario);
      Alert.alert('Éxito', 'Horario eliminado correctamente');
      fetchHorarios(); // Refrescar la lista de horarios
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el horario');
    }
  };

  const handleEdit = (horario) => {
    setSelectedHorario(horario);
    setHoraProgramada(horario.horaProgramada);
    setTurno(horario.turno);
    setFechaDeEmision(horario.fechaDeEmision);
  };

  const clearForm = () => {
    setHoraProgramada('');
    setTurno('');
    setFechaDeEmision('');
    setSelectedHorario(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Horarios</Text>

      <TextInput
        style={styles.input}
        value={horaProgramada}
        onChangeText={setHoraProgramada}
        placeholder="Hora Programada (HH:MM:SS)"
      />

      <TextInput
        style={styles.input}
        value={turno}
        onChangeText={setTurno}
        placeholder="Turno (mañana, tarde, noche)"
      />

      <TextInput
        style={styles.input}
        value={fechaDeEmision}
        onChangeText={setFechaDeEmision}
        placeholder="Fecha de Emisión (YYYY-MM-DD)"
      />

      <Button title={selectedHorario ? "Actualizar Horario" : "Crear Horario"} onPress={handleSubmit} />

      <FlatList
        data={horarios}
        keyExtractor={(item) => item.idHorario.toString()}
        renderItem={({ item }) => (
          <View style={styles.horarioItem}>
            <Text>{`Hora: ${item.horaProgramada}, Turno: ${item.turno}, Fecha: ${item.fechaDeEmision}`}</Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.idHorario)}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
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
  horarioItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
});

export default SetRoomScheduleScreen;
