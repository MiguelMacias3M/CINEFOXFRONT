import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { createMovie } from '../../apiService';
import { Picker } from '@react-native-picker/picker';

// Función para sanitizar texto
const sanitizeText = (text) => {
  return text.replace(/<[^>]*>/g, '').trim(); // Elimina etiquetas HTML y espacios en blanco
};

// Función para sanitizar y validar precio
const sanitizeAndValidatePrice = (price) => {
  const sanitizedPrice = parseFloat(price);
  return isNaN(sanitizedPrice) || sanitizedPrice <= 0 ? '' : sanitizedPrice.toFixed(2);
};

// Función para sanitizar y validar duración
const sanitizeAndValidateDuration = (duration) => {
  const sanitizedDuration = parseFloat(duration);
  return isNaN(sanitizedDuration) || sanitizedDuration <= 0 ? '' : sanitizedDuration;
};

// Función para validar clasificación
const validateClassification = (classification) => {
  const validClassifications = ['G', 'PG', 'PG-13', 'R', 'NC-17']; // Clasificaciones válidas
  const sanitizedClassification = sanitizeText(classification).toUpperCase();
  return validClassifications.includes(sanitizedClassification) ? sanitizedClassification : '';
};

const MovieFormScreen = ({ navigation }) => {
  const [nombrePelicula, setNombrePelicula] = useState('');
  const [directorPelicula, setDirectorPelicula] = useState('');
  const [duracionPelicula, setDuracionPelicula] = useState('');
  const [actoresPelicula, setActoresPelicula] = useState('');
  const [clasificacionPelicula, setClasificacionPelicula] = useState('');
  const [descripcionPelicula, setDescripcionPelicula] = useState('');
  const [precioBoleto, setPrecioBoleto] = useState('');
  const [imagenPelicula, setImagenPelicula] = useState(null);
  const [errorClasificacion, setErrorClasificacion] = useState('');

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (response.didCancel) {
        // El usuario canceló la selección de imagen
      } else if (response.errorCode) {
        Alert.alert('Error', 'Error al seleccionar la imagen');
      } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(response.assets[0].type)) {
        Alert.alert('Error', 'Formato de imagen no soportado. Solo se permiten .jpeg, .jpg, .png y .gif');
      } else {
        setImagenPelicula(response.assets[0]);
      }
    });
  };

  const validateInputs = () => {
    // Sanitización y validación de datos de texto
    const sanitizedNombre = sanitizeText(nombrePelicula);
    const sanitizedDirector = sanitizeText(directorPelicula);
    const sanitizedActores = sanitizeText(actoresPelicula);
    const sanitizedDescripcion = sanitizeText(descripcionPelicula);
    const sanitizedClasificacion = validateClassification(clasificacionPelicula);
    const sanitizedDuracion = sanitizeAndValidateDuration(duracionPelicula);
    const sanitizedPrecio = sanitizeAndValidatePrice(precioBoleto);

    // Validación de datos de texto
    if (!sanitizedNombre || !sanitizedDirector || !sanitizedActores ||
        !sanitizedDescripcion || !sanitizedClasificacion || !sanitizedDuracion || !sanitizedPrecio) {
      Alert.alert('Error', 'Por favor, complete todos los campos requeridos con datos válidos.');
      return false;
    }

    if (!sanitizedClasificacion) {
      setErrorClasificacion('Clasificación no válida. Las clasificaciones permitidas son: G, PG, PG-13, R, NC-17.');
      return false;
    } else {
      setErrorClasificacion('');
    }

    // Actualizar estados con datos sanitizados
    setNombrePelicula(sanitizedNombre);
    setDirectorPelicula(sanitizedDirector);
    setActoresPelicula(sanitizedActores);
    setDescripcionPelicula(sanitizedDescripcion);
    setClasificacionPelicula(sanitizedClasificacion);
    setDuracionPelicula(sanitizedDuracion);
    setPrecioBoleto(sanitizedPrecio);

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

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
      {errorClasificacion ? (
        <Text style={styles.errorText}>{errorClasificacion}</Text>
      ) : (
        <Text style={styles.infoText}>Clasificaciones permitidas: G, PG, PG-13, R, NC-17</Text>
      )}

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
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  infoText: {
    color: 'blue',
    marginBottom: 15,
  },
});

export default MovieFormScreen;
