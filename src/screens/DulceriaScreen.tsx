import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DulceriaScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Dulcería</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DulceriaScreen;
