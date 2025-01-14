import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install expo-linear-gradient if using Expo

const ProfileScreen = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    image: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with dynamic image URL if needed
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("User logged out");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1e2a49', '#2c3e50']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          {/* Info Container */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.infoText}>{user.phone}</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: '#fff',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen