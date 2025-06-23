import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, Region } from 'react-native-maps';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../styles/Theme';
import { carregarRecursos, carregarVoluntarios, Recurso, Voluntario } from '../utils/storage';
import { Notificacao } from '../components/NewAlertDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alertasData from '../../assets/alertas.json';

const { width } = Dimensions.get('window');

// Região padrão para São Paulo (exemplo)
const DEFAULT_REGION: Region = {
  latitude: -23.5505,
  longitude: -46.6333,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Interface para métricas do dashboard
interface DashboardMetrics {
  totalAlertas: number;
  alertasAtivos: number;
  totalRecursos: number;
  totalVoluntarios: number;
  regioesCriticas: number;
}

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAlertas: 0,
    alertasAtivos: 0,
    totalRecursos: 0,
    totalVoluntarios: 0,
    regioesCriticas: 0,
  });

  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [alertasCompletos, setAlertasCompletos] = useState<Notificacao[]>([]);

  // Carrega dados e calcula métricas
  const loadDashboardData = async () => {
    try {
      const [recursosData, voluntariosData] = await Promise.all([
        carregarRecursos(),
        carregarVoluntarios(),
      ]);

      // Carrega alertas custom do AsyncStorage
      const STORAGE_KEY_CUSTOM_ALERTS = '@cuidarcoletivo_custom_alerts';
      const customJson = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_ALERTS);
      const customAlertas: Notificacao[] = customJson ? JSON.parse(customJson) : [];

      console.log('Dashboard - Custom Alerts:', customAlertas);
      console.log('Dashboard - Quantidade de custom alerts:', customAlertas.length);

      // Combina alertas estáticos com customizados
      // Garante que os alertas estáticos têm o campo tipo
      const alertasEstaticos: Notificacao[] = (alertasData.notificacoes || []).map(alert => ({
        ...alert,
        tipo: alert.tipo || 'Informação' // Fallback para alertas sem tipo
      }));
      const todosAlertas = [...customAlertas, ...alertasEstaticos];

      console.log('Dashboard - Total de alertas:', todosAlertas.length);

      setRecursos(recursosData);
      setVoluntarios(voluntariosData);
      setAlertasCompletos(todosAlertas);

      // Calcula métricas baseadas nos dados
      const totalAlertas = todosAlertas.length;
      const alertasAtivos = todosAlertas.filter(alert => 
        alert.tipo === 'Alerta'
      ).length;

      console.log('Dashboard - Alertas ativos:', alertasAtivos);

      setMetrics({
        totalAlertas,
        alertasAtivos,
        totalRecursos: recursosData.length,
        totalVoluntarios: voluntariosData.length,
        regioesCriticas: alertasAtivos, // Assume que alertas ativos = regiões críticas
      });
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Recarrega dados sempre que a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      console.log('Dashboard: Carregando dados...');
      loadDashboardData();
    }, [])
  );

  // Componente de card de métrica
  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: string;
    color: string;
    iconFamily?: 'Ionicons' | 'MaterialCommunityIcons';
  }> = ({ title, value, icon, color, iconFamily = 'Ionicons' }) => {
    const IconComponent = iconFamily === 'MaterialCommunityIcons' 
      ? MaterialCommunityIcons 
      : Ionicons;

    return (
      <View style={[styles.metricCard, { borderLeftColor: color }]}>
        <View style={styles.metricHeader}>
          <IconComponent 
            name={icon as any} 
            size={24} 
            color={color} 
          />
          <Text style={styles.metricValue}>{value}</Text>
        </View>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>CuidarColetivo</Text>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Status em Tempo Real</Text>
      </View>

      {/* Métricas em Cards */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricsRow}>
          <MetricCard
            title="Alertas Ativos"
            value={metrics.alertasAtivos}
            icon="warning"
            color={Colors.error}
          />
          <MetricCard
            title="Regiões Críticas"
            value={metrics.regioesCriticas}
            icon="location"
            color={Colors.error}
          />
        </View>
        <View style={styles.metricsRow}>
          <MetricCard
            title="Recursos Disponíveis"
            value={metrics.totalRecursos}
            icon="gift"
            color={Colors.success}
            iconFamily="MaterialCommunityIcons"
          />
          <MetricCard
            title="Voluntários Ativos"
            value={metrics.totalVoluntarios}
            icon="people"
            color={Colors.primary}
          />
        </View>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Mapa de Situação</Text>
        <MapView
          style={styles.map}
          initialRegion={DEFAULT_REGION}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* Marcadores para recursos */}
          {recursos.map((recurso) => (
            <Marker
              key={`recurso-${recurso.id}`}
              coordinate={{
                latitude: DEFAULT_REGION.latitude + (Math.random() - 0.5) * 0.01,
                longitude: DEFAULT_REGION.longitude + (Math.random() - 0.5) * 0.01,
              }}
              title={recurso.nome}
              description={`${recurso.tipo} - ${recurso.quantidade}`}
              pinColor={Colors.success}
            />
          ))}

          {/* Marcadores para alertas (posições simuladas) */}
          {alertasCompletos
            .filter(alert => alert.tipo === 'Alerta')
            .map((alerta) => (
            <Marker
              key={`alerta-${alerta.id}`}
              coordinate={{
                latitude: DEFAULT_REGION.latitude + (Math.random() - 0.5) * 0.02,
                longitude: DEFAULT_REGION.longitude + (Math.random() - 0.5) * 0.02,
              }}
              title={alerta.titulo}
              description={alerta.mensagem}
              pinColor={Colors.error}
            />
          ))}
        </MapView>
      </View>

      {/* Resumo de Atividades Recentes */}
      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>Atividade Recente</Text>
        {alertasCompletos.slice(0, 3).map((alerta) => {
          const getCorPorTipo = (tipo: string) => {
            switch (tipo) {
              case 'Alerta': return Colors.error;
              case 'Atenção': return '#FF9800';
              case 'Convocação': return Colors.primary;
              case 'Informação': return Colors.success;
              default: return Colors.textSecondary;
            }
          };

          const getIconePorTipo = (tipo: string) => {
            switch (tipo) {
              case 'Alerta': return 'warning';
              case 'Atenção': return 'alert-circle';
              case 'Convocação': return 'people';
              case 'Informação': return 'information-circle';
              default: return 'notifications';
            }
          };

          return (
            <TouchableOpacity key={alerta.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons 
                  name={getIconePorTipo(alerta.tipo) as any} 
                  size={20} 
                  color={getCorPorTipo(alerta.tipo)} 
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{alerta.titulo}</Text>
                <Text style={styles.activityTime}>{alerta.data}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  appName: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  metricsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    width: (width - 48) / 2,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricValue: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  metricTitle: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  mapContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.subheading,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  map: {
    height: 200,
    borderRadius: 12,
  },
  activityContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  activityItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: Fonts.subheading,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default DashboardScreen; 