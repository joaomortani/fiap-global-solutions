import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';

export interface Voluntario {
  id: number;
  nome: string;
  tipoAjuda: string;
  regiao: string;
  contato: string;
}

type Props = {
  voluntario: Voluntario;
};

const CardVoluntario: React.FC<Props> = ({ voluntario }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{voluntario.nome}</Text>
      <Text style={styles.detalhes}>
        {voluntario.tipoAjuda} · Região: {voluntario.regiao}
      </Text>
      <Text style={styles.legenda}>Contato: {voluntario.contato}</Text>
    </View>
  );
};

export default CardVoluntario;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  titulo: {
    fontFamily: Fonts.subheading,
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  detalhes: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  legenda: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});