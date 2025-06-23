import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';
import { Ionicons } from '@expo/vector-icons';

export interface Atividade {
  id: number;
  titulo: string;
  detalhes: string;
  data: string;
}

type Props = {
  atividade: Atividade;
};

const CardAtividade: React.FC<Props> = ({ atividade }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={20} color={Colors.primary} />
        <Text style={styles.titulo}>{atividade.titulo}</Text>
      </View>
      <Text style={styles.detalhes}>{atividade.detalhes}</Text>
      <Text style={styles.data}>{atividade.data}</Text>
    </View>
  );
};

export default CardAtividade;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  titulo: {
    fontFamily: Fonts.subheading,
    fontSize: 15,
    color: Colors.primary,
    marginLeft: 6,
  },
  detalhes: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  data: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});