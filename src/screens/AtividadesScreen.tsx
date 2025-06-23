import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import CardAtividade, { Atividade } from '../components/CardAtividade';

const AtividadesScreen: React.FC = () => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  const atividadesExample: Atividade[] = [
    // ...
  ];

  useEffect(() => {
    setAtividades(atividadesExample);
  }, []);

  return (
    <View style={GlobalStyles.container}>
      {atividades.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={GlobalStyles.textoSecundario}>Nenhuma atividade registrada.</Text>
        </View>
      ) : (
        <FlatList
          data={atividades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardAtividade atividade={item} />}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </View>
  );
};

export default AtividadesScreen;

const styles = StyleSheet.create({
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});