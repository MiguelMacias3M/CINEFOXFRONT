import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa desde el nuevo paquete
import { launchImageLibrary } from 'react-native-image-picker'; // Importa la función para seleccionar imágenes
import { createMovie } from '../../apiService'; // Ajusta la ruta de importación según tu estructura

const MovieFormScreen = ({ navigation }) => {
  const [nombrePelicula, setNombrePelicula] = useState('');
  const [directorPelicula, setDirectorPelicula] = useState('');
  const [duracionPelicula, setDuracionPelicula] = useState('');
  const [actoresPelicula, setActoresPelicula] = useState('');
  const [clasificacionPelicula, setClasificacionPelicula] = useState('');
  const [descripcionPelicula, setDescripcionPelicula] = useState('');
  const [precioBoleto, setPrecioBoleto] = useState('');
  const [imagenPelicula, setImagenPelicula] = useState(null); // Nuevo estado para manejar la imagen



  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        // El usuario canceló la selección de imagen
      } else if (response.errorCode) {
        Alert.alert('Error', 'Error al seleccionar la imagen');
      } else {
        setImagenPelicula(response.assets[0]); // Asume que la primera imagen es la seleccionada
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nombrePelicula', nombrePelicula);
      formData.append('directorPelicula', directorPelicula);
      formData.append('duracionPelicula', duracionPelicula);
      formData.append('actoresPelicula', actoresPelicula);
      formData.append('clasificacionPelicula', clasificacionPelicula);
      formData.append('descripcionPelicula', descripcionPelicula);
      formData.append('precioBoleto', precioBoleto);

      if (imagenPelicula) {
        formData.append('imagenPelicula', {
          uri: imagenPelicula.uri,
          type: imagenPelicula.type,
          name: imagenPelicula.fileName,
        });
      }

      await createMovie(formData);
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

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcionPelicula}
        onChangeText={setDescripcionPelicula}
      />


      <TextInput
        style={styles.input}
        placeholder="Precio del Boleto"
        value={precioBoleto}
        onChangeText={setPrecioBoleto}
        keyboardType="numeric"
      />

      <Button title="Seleccionar Imagen" onPress={handleImagePick} />
      {imagenPelicula && (
        <Image
          source={{ uri: imagenPelicula.uri }}
          style={styles.image}
        />
      )}

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
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default MovieFormScreen;
