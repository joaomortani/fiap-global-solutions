import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Pedido {
  id: number;
  titulo: string;
  descricao: string;
  local: string;
  data: string;
}

type Props = {
  pedido: Pedido;
  onPress?: () => void;
};

const CardPedido: React.FC<Props> = ({ pedido, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="hand-heart" size={24} color={Colors.white} />
        </View>
        <Text style={styles.titulo}>{pedido.titulo}</Text>
      </View>
      <Text style={styles.descricao}>{pedido.descricao}</Text>
      <View style={styles.footer}>
        <Text style={styles.local}>Local: {pedido.local}</Text>
        <Text style={styles.data}>{pedido.data}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardPedido;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  titulo: {
    fontFamily: Fonts.subheading,
    fontSize: 16,
    color: Colors.primary,
    flex: 1,
  },
  descricao: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  local: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  data: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});