import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Importa la función para seleccionar imágenes
import { updatePelicula } from '../../apiService'; // Ajusta la ruta de importación según tu estructura

const EditMovieScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  
  const [nombrePelicula, setNombrePelicula] = useState(movie.nombrePelicula);
  const [directorPelicula, setDirectorPelicula] = useState(movie.directorPelicula);
  const [duracionPelicula, setDuracionPelicula] = useState(movie.duracionPelicula);
  const [actoresPelicula, setActoresPelicula] = useState(movie.actoresPelicula);
  const [clasificacionPelicula, setClasificacionPelicula] = useState(movie.clasificacionPelicula);
  const [precioBoleto, setPrecioBoleto] = useState(movie.precioBoleto);
  const [imagenPelicula, setImagenPelicula] = useState(null);

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
      formData.append('precioBoleto', precioBoleto);

      if (imagenPelicula) {
        formData.append('imagenPelicula', {
          uri: imagenPelicula.uri,
          type: imagenPelicula.type,
          name: imagenPelicula.fileName,
        });
      }

      await updatePelicula(movie.idPelicula, formData);
      Alert.alert('Éxito', 'Película actualizada correctamente');
      navigation.goBack(); // Regresar a la pantalla anterior después de actualizar la película
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la película');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Película</Text>

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

      <Button title="Actualizar Película" onPress={handleSubmit} />
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

export default EditMovieScreen;
