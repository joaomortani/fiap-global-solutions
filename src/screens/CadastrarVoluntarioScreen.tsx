import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import InputField from '../components/InputField';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { salvarVoluntario } from '../utils/storage';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastrarVoluntario'>;

const CadastrarVoluntarioScreen: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [tipoAjuda, setTipoAjuda] = useState('');
  const [regiao, setRegiao] = useState('');
  const [contato, setContato] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast, showSuccess, showError, hideToast } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nome.trim()) errs.nome = 'Informe o nome completo.';
    if (!tipoAjuda.trim()) errs.tipoAjuda = 'Informe o tipo de ajuda.';
    if (!regiao.trim()) errs.regiao = 'Informe a região de atuação.';
    if (!contato.trim()) errs.contato = 'Informe o contato.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSalvar = async () => {
    if (!validate()) return;

    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      tipoAjuda: tipoAjuda.trim(),
      regiao: regiao.trim(),
      contato: contato.trim(),
    };

    try {
      await salvarVoluntario(novo);
      showSuccess('Voluntário cadastrado com sucesso!');
      // Aguarda um pouco antes de navegar para mostrar o toast
      setTimeout(() => {
        navigation.navigate('HomeTabs');
      }, 1500);
    } catch {
      showError('Não foi possível salvar o voluntário.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={GlobalStyles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        <InputField
          label="Nome Completo"
          placeholder="Ex.: Maria Silva"
          value={nome}
          onChangeText={setNome}
          errorMessage={errors.nome}
        />
        <InputField
          label="Tipo de Ajuda"
          placeholder="Ex.: Motorista, Primeiros Socorros"
          value={tipoAjuda}
          onChangeText={setTipoAjuda}
          errorMessage={errors.tipoAjuda}
        />
        <InputField
          label="Região de Atuação"
          placeholder="Ex.: Bairro Centro"
          value={regiao}
          onChangeText={setRegiao}
          errorMessage={errors.regiao}
        />
        <InputField
          label="Contato (telefone/e-mail)"
          placeholder="Ex.: (21) 99999-0000"
          value={contato}
          onChangeText={setContato}
          errorMessage={errors.contato}
        />

        <TouchableOpacity style={GlobalStyles.botaoPrimario} onPress={handleSalvar}>
          <Text style={GlobalStyles.botaoPrimarioText}>Salvar Voluntário</Text>
        </TouchableOpacity>
      </ScrollView>
      
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

export default CadastrarVoluntarioScreen;