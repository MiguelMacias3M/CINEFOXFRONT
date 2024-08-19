import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchLogs } from '../../apiService'; // Asegúrate de que este archivo contenga la función para llamar a tu API.

interface Log {
  usuario: string;
  accion: string;
  fechaHora: string;
  host: string;
}

const LogsScreen: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
      } catch (error) {
        console.error('Error al cargar los logs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#E50914" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logs de Sistema</Text>
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>Usuario: {item.usuario}</Text>
            <Text style={styles.logText}>Acción: {item.accion}</Text>
            <Text style={styles.logText}>Fecha y Hora: {item.fechaHora}</Text>
            <Text style={styles.logText}>Host: {item.host}</Text>
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
    backgroundColor: '#2D3E50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  logItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  logText: {
    color: 'black',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogsScreen;
