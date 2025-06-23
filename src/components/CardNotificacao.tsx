
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts } from '../styles/Theme';
import { Ionicons } from '@expo/vector-icons';
import { Notificacao } from './NewAlertDialog';

type Props = {
  notificacao: Notificacao;
};

const CardNotificacao: React.FC<Props> = ({ notificacao }) => {
  
  const getGradientColors = (tipo: string): [string, string] => {
    switch (tipo) {
      case 'Alerta':
        return ['#D32F2F', '#B71C1C'];     // Vermelho
      case 'Atenção':
        return ['#FF9800', '#F57C00'];     // Laranja
      case 'Convocação':
        return ['#1B3B6F', '#0D2A52'];     // Azul escuro
      case 'Informação':
        return ['#2F8F4E', '#1F5F35'];     // Verde
      default:
        return ['#4A90E2', '#3B7DDD'];     // Azul padrão
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

  const gradientColors = getGradientColors(notificacao.tipo || 'Informação');

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardGradient}
    >
      {/* Cabeçalho com ícone e título */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons 
            name={getIconePorTipo(notificacao.tipo || 'Informação') as any} 
            size={20} 
            color={Colors.white} 
          />
        </View>
        <Text style={styles.titulo}>{notificacao.titulo}</Text>
      </View>

      {/* Mensagem principal */}
      <Text style={styles.mensagem}>{notificacao.mensagem}</Text>

      {/* Rodapé com data */}
      <View style={styles.footer}>
        <Text style={styles.data}>{notificacao.data}</Text>
      </View>
    </LinearGradient>
  );
};

export default CardNotificacao;

const styles = StyleSheet.create({
  cardGradient: {
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  titulo: {
    fontFamily: Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
    flex: 1,
  },
  mensagem: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.white,
    marginBottom: 8,
  },
  footer: {
    alignItems: 'flex-end',
  },
  data: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.white,
    opacity: 0.9,
  },
});