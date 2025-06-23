import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenHeader from '../components/ScreenHeader';
import CardRecurso, { Recurso } from '../components/CardRecurso';
import { carregarRecursos } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RecursosScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [recursos, setRecursos] = useState<Recurso[]>([]);

  const fetchRecursos = async () => {
    const lista = await carregarRecursos();
    setRecursos(lista);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRecursos();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Recursos" subtitle="Pontos de apoio disponíveis" />
      <View style={styles.content}>
        {recursos.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={GlobalStyles.textoSecundario}>
              Nenhum recurso cadastrado.
            </Text>
          </View>
        ) : (
          <FlatList
            data={recursos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardRecurso recurso={item} />}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        )}

        <TouchableOpacity
          style={[GlobalStyles.fab, { backgroundColor: Colors.secondary }]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('CadastrarRecurso')}
        >
          <Ionicons name="add" size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecursosScreen;

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