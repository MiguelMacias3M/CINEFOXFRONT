import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SupportTeamScreen = () => {
  const teamMembers = [
    { name: 'Luis Bruno', email: 'luisB@gmail.com', specialty: 'Backend Developer' },
    { name: 'Miguel Macias', email: 'miguelM@gmail.com', specialty: 'Frontend Developer' },
    { name: 'Ricardo Elias', email: 'ricardoE@gmail.com', specialty: 'UI/UX Designer' },
    { name: 'Jesus Vargas', email: 'jesusV@gmail.com', specialty: 'Tester' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipo de Soporte</Text>
      {teamMembers.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <View style={styles.memberInfo}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.specialty}>{member.specialty}</Text>
            <Text style={styles.email}>{member.email}</Text>
          </View>
          <Image
            source={require('../../assets/icons/user.png')} // Reemplaza esto con la ruta correcta para la imagen del perfil si la tienes
            style={styles.avatar}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  memberContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  memberInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
  },
});

export default SupportTeamScreen;
