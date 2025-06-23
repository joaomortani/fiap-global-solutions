import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';

const PerfilScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>PerfilScreen</Text>
      <Text style={styles.texto}>Dados do usuário e configurações.</Text>
      {/* Exemplo de avatar placeholder */}
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titulo: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  texto: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 24,
  },
});