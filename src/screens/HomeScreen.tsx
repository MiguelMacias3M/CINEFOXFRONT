import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { logoutUsuario } from '../apiService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const peliculas = [
  { title: 'Wolverine', image: require('../assets/deadpool.jpg') },
  { title: 'Intensamente 2', image: require('../assets/intensamente.jpg') },
  { title: 'Mi villano favorito', image: require('../assets/mivillanofavorito.jpg') },
  { title: 'Exorcismo', image: require('../assets/exorsismo.jpg') },
  { title: 'Tornados', image: require('../assets/tornados.jpg') },
  { title: 'Ted', image: require('../assets/harold.jpg') },
];

const proximosEstrenos = [
  { title: 'Borderlands', image: require('../assets/borderlands.jpg') },
  { title: 'Romper el circulo', image: require('../assets/rompercirculo.jpg') },
  { title: 'Candidato Honesto', image: require('../assets/cantidatohonesto.jpg') },
];

const recomendaciones = [
  { title: 'Inception', image: require('../assets/elcadavernovia.jpeg') },
  { title: 'Intensamente', image: require('../assets/intensamente.jpg') },
  { title: 'Wolverine', image: require('../assets/deadpool.jpg') },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.movieImage} />
    </View>
  );

  const confirmLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar la sesión y salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = async () => {
    try {
      await logoutUsuario();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        confirmLogout();
        return true; // Evita que la acción de volver atrás ocurra automáticamente
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.menuItem}>Inicio</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cartelera')}>
          <Text style={styles.menuItem}>Cartelera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dulceria')}>
          <Text style={styles.menuItem}>Dulceria</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contacto')}>
          <Text style={styles.menuItem}>Contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmLogout}>
          <Text style={styles.menuItem}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>Bienvenido a Cine-Fox</Text>
      </View>

      <Text style={styles.subtitle}>Estrenos</Text>
      <FlatList
        horizontal
        data={peliculas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesContainer}
      />

      <Text style={styles.subtitle}>Próximos Estrenos</Text>
      <FlatList
        horizontal
        data={proximosEstrenos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesContainer}
      />

      <Text style={styles.subtitle}>Recomendaciones</Text>
      <FlatList
        horizontal
        data={recomendaciones}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesContainer}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Cine-Fox Cinema</Text>
        <Text style={styles.footerText}>Dirección: Calle La Nueba #123, Aguascalientes, México</Text>
        <Text style={styles.footerText}>Teléfono: +1 234 567 890</Text>
        <Text style={styles.footerText}>Email: contacto@cinefox.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2D3E50',
    padding: 16,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A252F',
    paddingVertical: 10,
  },
  menuItem: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  moviesContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 200,
    backgroundColor: '#2D3E50',
    borderWidth: 0,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: 280,
  },
  moreButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  moreButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 6,
  },
});

export default HomeScreen;
