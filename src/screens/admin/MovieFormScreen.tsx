import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createPelicula } from '../apiService';

const MovieFormScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [director, setDirector] = useState('');
    const [duracion, setDuracion] = useState('');
    const [actores, setActores] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [precio, setPrecio] = useState('');

    const handleSubmit = async () => {
        try {
            const peliculaData = {
                nombrePelicula: nombre,
                directorPelicula: director,
                duracionPelicula: parseInt(duracion),
                actoresPelicula: actores,
                clasificacionPelicula: clasificacion,
                precioBoleto: parseInt(precio),
                idHorario: 1 // Asignar un horario por defecto o manejarlo dinámicamente
            };

            await createPelicula(peliculaData);
            Alert.alert('Éxito', 'Película creada correctamente');
            navigation.goBack(); // Volver a la pantalla anterior
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear la película');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nombre de la Película</Text>
            <TextInput value={nombre} onChangeText={setNombre} />

            <Text>Director</Text>
            <TextInput value={director} onChangeText={setDirector} />

            <Text>Duración (minutos)</Text>
            <TextInput value={duracion} onChangeText={setDuracion} keyboardType="numeric" />

            <Text>Actores</Text>
            <TextInput value={actores} onChangeText={setActores} />

            <Text>Clasificación</Text>
            <TextInput value={clasificacion} onChangeText={setClasificacion} />

            <Text>Precio del Boleto</Text>
            <TextInput value={precio} onChangeText={setPrecio} keyboardType="numeric" />

            <Button title="Crear Película" onPress={handleSubmit} />
        </View>
    );
};

export default MovieFormScreen;
