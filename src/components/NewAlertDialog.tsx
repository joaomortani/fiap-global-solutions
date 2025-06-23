import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '../styles/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from './Toast';
import { useToast } from '../hooks/useToast';

export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  data: string;
  tipo: string;
}

// Tipos de alerta disponíveis
export const TIPOS_ALERTA = [
  'Alerta',
  'Atenção', 
  'Convocação',
  'Informação'
] as const;

// Chave que usaremos para armazenar “alertas custom” no AsyncStorage
const STORAGE_KEY_CUSTOM_ALERTS = '@cuidarcoletivo_custom_alerts';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSaved: () => void; // callback quando um novo alerta for salvo
};

const NewAlertDialog: React.FC<Props> = ({ visible, onClose, onSaved }) => {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState<string>(TIPOS_ALERTA[0]);
  const { toast, showError, hideToast } = useToast();

  // Formata a data atual como “DD/MM/YYYY HH:mm”
  const formatNow = (): string => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  const handleSave = async () => {
    if (!titulo.trim() || !mensagem.trim()) {
      showError('Preencha título e mensagem.');
      return;
    }

    const novoAlert: Notificacao = {
      id: Date.now(),
      titulo: titulo.trim(),
      mensagem: mensagem.trim(),
      data: formatNow(),
      tipo: tipoSelecionado,
    };

    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_ALERTS);
      const arr: Notificacao[] = existing ? JSON.parse(existing) : [];
      arr.push(novoAlert);
      await AsyncStorage.setItem(STORAGE_KEY_CUSTOM_ALERTS, JSON.stringify(arr));

      // Limpa campos
      setTitulo('');
      setMensagem('');
      setTipoSelecionado(TIPOS_ALERTA[0]);
      onSaved();   // avisa a tela que salvamos um alerta (para recarregar lista)
      onClose();   // fecha o modal
    } catch (error) {
      console.error('Erro ao salvar alerta:', error);
      showError('Não foi possível salvar o alerta.');
    }
  };

  // Função para obter a cor baseada no tipo
  const getCorPorTipo = (tipo: string) => {
    switch (tipo) {
      case 'Alerta': return Colors.error;
      case 'Atenção': return '#FF9800';
      case 'Convocação': return Colors.primary;
      case 'Informação': return Colors.success;
      default: return Colors.textSecondary;
    }
  };

  // Função para obter o ícone baseado no tipo
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
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.header}>Novo Alerta</Text>

          {/* Seleção do Tipo */}
          <Text style={styles.label}>Tipo do Alerta</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tiposContainer}
          >
            {TIPOS_ALERTA.map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={[
                  styles.tipoButton,
                  tipoSelecionado === tipo && {
                    backgroundColor: getCorPorTipo(tipo),
                    borderColor: getCorPorTipo(tipo)
                  }
                ]}
                onPress={() => setTipoSelecionado(tipo)}
              >
                <Ionicons 
                  name={getIconePorTipo(tipo) as any} 
                  size={18} 
                  color={tipoSelecionado === tipo ? Colors.white : getCorPorTipo(tipo)} 
                />
                <Text 
                  style={[
                    styles.tipoText,
                    tipoSelecionado === tipo && { color: Colors.white }
                  ]}
                >
                  {tipo}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Título do Alerta"
            placeholderTextColor={Colors.textSecondary}
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Mensagem"
            placeholderTextColor={Colors.textSecondary}
            value={mensagem}
            onChangeText={setMensagem}
            multiline
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: Colors.primary }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={[styles.buttonText]}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    
    <Toast
      visible={toast.visible}
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      onHide={hideToast}
    />
  </>
  );
};

export default NewAlertDialog;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
  },
  header: {
    fontFamily: Fonts.subheading,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.background,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: Colors.background,
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontFamily: Fonts.subheading,
    fontSize: 14,
    color: Colors.white,
  },
  label: {
    fontFamily: Fonts.subheading,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  tiposContainer: {
    marginBottom: 16,
    maxHeight: 50,
  },
  tipoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  tipoText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textPrimary,
    marginLeft: 4,
  },
});