import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenHeader from '../components/ScreenHeader';
import CardNotificacao, { Notificacao } from '../components/CardNotificacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alertasData from '../../assets/alertas.json';
import { Colors } from '../styles/Theme';

const STORAGE_KEY_CUSTOM_ALERTS = '@cuidarcoletivo_custom_alerts';

const NotificacoesScreen: React.FC = ({ navigation }: any) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const fetchNotificacoes = async () => {
    try {
      // Busca alertas criados em tempo de execução
      const customJson = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_ALERTS);
      const customArr: Notificacao[] = customJson
        ? JSON.parse(customJson)
        : [];

      // Carrega alertas “estáticos” do JSON
      const staticArr: Notificacao[] = alertasData.notificacoes || [];

      // Junta os dois (coloca os custom primeiro)
      setNotificacoes([...customArr, ...staticArr]);
    } catch (error) {
      console.error('Erro ao carregar alertas custom:', error);
      setNotificacoes(alertasData.notificacoes || []);
    }
  };

  useEffect(() => {
    fetchNotificacoes();

    // Ao receber o evento “customAlertSaved” disparado pelo CustomTabBar,
    // refazemos fetch para mostrar o alerta recém-criado
    const unsubscribe = navigation.addListener('customAlertSaved', () => {
      fetchNotificacoes();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Notificações" subtitle="Alertas e avisos importantes" />
      <View style={styles.content}>
        {notificacoes.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={GlobalStyles.textoSecundario}>Sem notificações.</Text>
          </View>
        ) : (
          <FlatList
            data={notificacoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardNotificacao notificacao={item} />}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        )}
      </View>
    </View>
  );
};

export default NotificacoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});