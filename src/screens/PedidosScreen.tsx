import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import CardPedido, { Pedido } from '../components/CardPedido';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const PedidosScreen: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { toast, showInfo, hideToast } = useToast();

  const pedidosExample: Pedido[] = [
    // ...
  ];

  useEffect(() => {
    setPedidos(pedidosExample);
  }, []);

  const handlePressPedido = (pedido: Pedido) => {
    showInfo(`${pedido.titulo}\nLocal: ${pedido.local}`);
  };

  return (
    <View style={GlobalStyles.container}>
      {pedidos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={GlobalStyles.textoSecundario}>Nenhum pedido encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardPedido pedido={item} onPress={() => handlePressPedido(item)} />
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
      
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onHide={hideToast}
      />
    </View>
  );
};

export default PedidosScreen;

const styles = StyleSheet.create({
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});