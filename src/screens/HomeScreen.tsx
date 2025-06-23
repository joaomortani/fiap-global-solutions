
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CardNotificacao, { Notificacao } from '../components/CardNotificacao';
import CardPedido, { Pedido } from '../components/CardPedido';

import alertasData from '../../assets/alertas.json';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [pedidoAjuda, setPedidoAjuda] = useState<Pedido | null>(null);

  useEffect(() => {
    setNotificacoes(alertasData.notificacoes || []);

    setPedidoAjuda({
      id: 999,
      titulo: 'Pedido de Ajuda',
      descricao: 'Famílias afetadas pela enchente precisam de água e cobertores.',
      local: 'Bairro Centro',
      data: '06/06/2025 15:00',
    });
  }, []);

  const handlePressPedido = () => {
    navigation.navigate('Pedidos');
  };

  return (
    <ScrollView
      style={GlobalStyles.container}
      contentContainerStyle={{ paddingTop: 48, paddingBottom: 24 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={GlobalStyles.titulo}>CuidarColetivo</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 16 }} />

      {/* Lista de Notificações (usa CardNotificacao) */}
      {notificacoes.map((item) => (
        <CardNotificacao key={item.id} notificacao={item} />
      ))}

      <View style={{ height: 12 }} />

      {/* Card de “Pedido de Ajuda” (usa CardPedido) */}
      {pedidoAjuda && (
        <CardPedido
          pedido={pedidoAjuda}
          onPress={handlePressPedido}
        />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 8,
  },
});