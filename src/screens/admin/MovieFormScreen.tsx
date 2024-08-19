import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { createMovie } from '../../apiService';

const sanitizeText = (text) => {
  return text.replace(/<[^>]*>/g, '').trim();
};

const sanitizeAndValidatePrice = (price) => {
  const sanitizedPrice = parseFloat(price);
  return isNaN(sanitizedPrice) || sanitizedPrice <= 0 ? '' : sanitizedPrice.toFixed(2);
};

const sanitizeAndValidateDuration = (duration) => {
  const sanitizedDuration = parseFloat(duration);
  return isNaN(sanitizedDuration) || sanitizedDuration <= 0 ? '' : sanitizedDuration;
};

const validateClassification = (classification) => {
  const validClassifications = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
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
    const sanitizedNombre = sanitizeText(nombrePelicula);
    const sanitizedDirector = sanitizeText(directorPelicula);
    const sanitizedActores = sanitizeText(actoresPelicula);
    const sanitizedDescripcion = sanitizeText(descripcionPelicula);
    const sanitizedClasificacion = validateClassification(clasificacionPelicula);
    const sanitizedDuracion = sanitizeAndValidateDuration(duracionPelicula);
    const sanitizedPrecio = sanitizeAndValidatePrice(precioBoleto);

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
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la película');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Película</Text>

      <Input
        placeholder="Nombre de la Película"
        value={nombrePelicula}
        onChangeText={setNombrePelicula}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Input
        placeholder="Director"
        value={directorPelicula}
        onChangeText={setDirectorPelicula}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Input
        placeholder="Duración (minutos)"
        value={duracionPelicula}
        onChangeText={setDuracionPelicula}
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Input
        placeholder="Actores"
        value={actoresPelicula}
        onChangeText={setActoresPelicula}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Input
        placeholder="Clasificación"
        value={clasificacionPelicula}
        onChangeText={setClasificacionPelicula}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        errorMessage={errorClasificacion || 'Clasificaciones permitidas: G, PG, PG-13, R, NC-17'}
      />

      <Input
        placeholder="Descripción"
        value={descripcionPelicula}
        onChangeText={setDescripcionPelicula}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Input
        placeholder="Precio del Boleto"
        value={precioBoleto}
        onChangeText={setPrecioBoleto}
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Button
        title="Seleccionar Imagen"
        onPress={handleImagePick}
        buttonStyle={styles.imageButton}
      />
      {imagenPelicula && (
        <Image
          source={{ uri: imagenPelicula.uri }}
          style={styles.image}
        />
      )}

      <Button
        title="Crear Película"
        onPress={handleSubmit}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitButtonText} // Asegúrate de que el texto esté centrado
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    width: '100%',
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el texto esté centrado
    width: '100%', // Hace que el texto ocupe todo el ancho del botón
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E50914',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    paddingLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginVertical: 10,
    borderRadius: 10,
  },
  imageButton: {
    backgroundColor: '#4995e8',
    marginBottom: 15,
  },
});

export default MovieFormScreen;
