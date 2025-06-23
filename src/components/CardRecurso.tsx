import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';

export interface Recurso {
  id: number;
  nome: string;
  tipo: string;
  quantidade: string;
  endereco: string;
}

type Props = {
  recurso: Recurso;
};

const CardRecurso: React.FC<Props> = ({ recurso }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{recurso.nome}</Text>
      <Text style={styles.detalhes}>
        {recurso.tipo} · {recurso.quantidade}
      </Text>
      <Text style={styles.legenda}>Local: {recurso.endereco}</Text>
    </View>
  );
};

export default CardRecurso;

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