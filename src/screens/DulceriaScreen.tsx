import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const categorias = [
  { id: '1', name: 'Palomitas' },
  { id: '2', name: 'Bebidas' },
  { id: '3', name: 'Dulces' },
  { id: '4', name: 'Comida' },
];

const productos = {
  Palomitas: [
    { id: '1', name: 'Palomitas Mantequilla', image: require('../assets/dulceria/palomitas.png'), price: 50 },
    { id: '2', name: 'Palomitas Caramelo', image: require('../assets/dulceria/palomitas.png'), price: 55 },
  
  ],
  Bebidas: [
    { id: '3', name: 'Refresco', image: require('../assets/dulceria/refresco.png'), price: 30 },
    { id: '4', name: 'Agua', image: require('../assets/dulceria/refresco.png'), price: 25 },
 

  ],
  Dulces: [
    { id: '5', name: 'Gomitas', image: require('../assets/dulceria/dulces.png'), price: 20 },
    { id: '6', name: 'Chocolate', image: require('../assets/dulceria/dulces.png'), price: 35 },

  ],
  Comida: [
    { id: '7', name: 'Nachos', image: require('../assets/dulceria/nachos.png'), price: 45 },
    { id: '8', name: 'Hot Dog', image: require('../assets/dulceria/nachos.png'), price: 40 },
  ],
};

const DulceriaScreen = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Palomitas');

  const renderCategoria = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoriaButton,
        categoriaSeleccionada === item.name && styles.categoriaButtonSelected,
      ]}
      onPress={() => setCategoriaSeleccionada(item.name)}
    >
      <Text style={styles.categoriaButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProducto = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      {/* <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>*/} 
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dulcería</Text>
      
      <FlatList
        data={categorias}
        renderItem={renderCategoria}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriasContainer}
      />
      
      <FlatList
        data={productos[categoriaSeleccionada]}
        renderItem={renderProducto}
        keyExtractor={item => item.id}
        numColumns={2} // Mostrar 2 productos por fila
        columnWrapperStyle={styles.row} // Estilo para la fila
        contentContainerStyle={styles.productsContainer}
      />
      <Text style={styles.title}>¡¡¡Próximamente venta en la aplicación!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3E50',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoriasContainer: {
    marginBottom: 20,
    flexDirection: 'row', // Asegura que las categorías se dispongan en fila
  },
  categoriaButton: {
    backgroundColor: '#1A252F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90, // Ancho del botón ajustado para que quepan más en la pantalla
  },
  categoriaButtonSelected: {
    backgroundColor: '#E50914',
  },
  categoriaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  productsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1A252F',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    width: '48%',
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#E50914',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DulceriaScreen;
