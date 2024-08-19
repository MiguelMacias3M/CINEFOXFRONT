// SupportTeamScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.email}>{member.email}</Text>
          <Text style={styles.specialty}>{member.specialty}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  memberContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  specialty: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default SupportTeamScreen;
