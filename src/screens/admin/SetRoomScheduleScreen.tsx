import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { getHorarios, createCartelera } from '../../apiService';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';


const daysOfWeek = [
  { label: 'Lunes', value: 'Lunes' },
  { label: 'Martes', value: 'Martes' },
  { label: 'Miércoles', value: 'Miércoles' },
  { label: 'Jueves', value: 'Jueves' },
  { label: 'Viernes', value: 'Viernes' },
  { label: 'Sábado', value: 'Sábado' },
  { label: 'Domingo', value: 'Domingo' }
];

const SetRoomScheduleScreen = ({ route, navigation }) => {
  const { movieId, roomId } = route.params;
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [availableHorarios, setAvailableHorarios] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
      fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
      try {
          const horarios = await getHorarios();
          setAvailableHorarios(horarios);
      } catch (error) {
          console.error('Error al obtener horarios:', error);
          Alert.alert('Error', 'No se pudieron cargar los horarios');
      }
  };

  const toggleDaySelection = (day) => {
      if (selectedDays.includes(day)) {
          setSelectedDays(selectedDays.filter(d => d !== day));
      } else {
          setSelectedDays([...selectedDays, day]);
      }
  };

  const handleSubmit = async () => {
    if (!selectedHorario || selectedDays.length === 0) {
        Alert.alert('Error', 'Debe seleccionar al menos un horario y un día');
        return;
    }

    try {
        console.log("Días seleccionados:", selectedDays); // Mostrar los días seleccionados en la consola
        
        // Enviar todos los días en una sola solicitud
        const response = await createCartelera(movieId, roomId, selectedHorario, selectedDays);
        console.log('Datos enviados:', {
            movieId,
            roomId,
            selectedHorario,
            selectedDays
        });

        Alert.alert('Éxito', 'Cartelera creada correctamente');
        navigation.goBack(); // Regresa a la pantalla anterior después de crear la cartelera
    } catch (error) {
        console.error('Error en handleSubmit:', error);
        Alert.alert('Error', 'No se pudo crear la cartelera');
    }
};



  return (
      <View style={styles.container}>
          <Text style={styles.title}>Selecciona un Horario y Días</Text>

          <Text style={styles.label}>Horario:</Text>
          <Picker
              selectedValue={selectedHorario}
              onValueChange={(itemValue) => setSelectedHorario(itemValue)}
              style={styles.picker}
          >
              <Picker.Item label="Selecciona un horario" value={null} />
              {availableHorarios.map((horario) => (
                  <Picker.Item
                      key={horario.idHorario}
                      label={`${horario.horaProgramada}`}
                      value={horario.idHorario}
                  />
              ))}
          </Picker>

          <Text style={styles.label}>Días:</Text>
          {daysOfWeek.map((day) => (
              <View key={day.value} style={styles.dayContainer}>
                  <CheckBox
                      value={selectedDays.includes(day.value)}
                      onValueChange={() => toggleDaySelection(day.value)}
                  />
                  <Text>{day.label}</Text>
              </View>
          ))}

          <Button title="Registrar Cartelera" onPress={handleSubmit} />
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
  label: {
      fontSize: 18,
      marginBottom: 10,
  },
  picker: {
      height: 50,
      width: '100%',
      marginBottom: 20,
  },
  dayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
});

export default SetRoomScheduleScreen;