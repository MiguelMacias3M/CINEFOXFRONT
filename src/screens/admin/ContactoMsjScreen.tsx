import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchContactMessages } from '../../apiService';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
}

const ContactMessagesScreen: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchContactMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error al cargar los mensajes de contacto:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#E50914" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensajes de Contacto</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.messageText}>Nombre: {item.name}</Text>
            <Text style={styles.messageText}>Email: {item.email}</Text>
            <Text style={styles.messageText}>Mensaje: {item.message}</Text>
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
  messageItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  messageText: {
    color: 'black',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactMessagesScreen;
