
import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import InputField from '../components/InputField';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { salvarRecurso } from '../utils/storage';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastrarRecurso'>;

const CadastrarRecursoScreen: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast, showSuccess, showError, hideToast } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nome.trim()) errs.nome = 'Informe o nome do local.';
    if (!tipo.trim()) errs.tipo = 'Informe o tipo de recurso.';
    if (!quantidade.trim()) errs.quantidade = 'Informe a quantidade.';
    if (!endereco.trim()) errs.endereco = 'Informe o endereço.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSalvar = async () => {
    if (!validate()) return;

    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      tipo: tipo.trim(),
      quantidade: quantidade.trim(),
      endereco: endereco.trim(),
    };

    try {
      await salvarRecurso(novo);
      showSuccess('Recurso cadastrado com sucesso!');
      // Aguarda um pouco antes de navegar para mostrar o toast
      setTimeout(() => {
        navigation.navigate('HomeTabs');
      }, 1500);
    } catch {
      showError('Não foi possível salvar o recurso.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={GlobalStyles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        <InputField
          label="Nome do Local / Organização"
          placeholder="Ex.: Igreja São João"
          value={nome}
          onChangeText={setNome}
          errorMessage={errors.nome}
        />
        <InputField
          label="Tipo de Recurso"
          placeholder="Ex.: Água Potável"
          value={tipo}
          onChangeText={setTipo}
          errorMessage={errors.tipo}
        />
        <InputField
          label="Quantidade"
          placeholder="Ex.: 200 L"
          value={quantidade}
          onChangeText={setQuantidade}
          errorMessage={errors.quantidade}
        />
        <InputField
          label="Endereço / Ponto de Referência"
          placeholder="Ex.: Rua das Flores, 123"
          multiline
          style={{ height: 80 }}
          value={endereco}
          onChangeText={setEndereco}
          errorMessage={errors.endereco}
        />

        <TouchableOpacity style={GlobalStyles.botaoSecundario} onPress={handleSalvar}>
          <Text style={GlobalStyles.botaoSecundarioText}>Salvar Recurso</Text>
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

export default CadastrarRecursoScreen;