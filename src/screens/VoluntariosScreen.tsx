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
import CardVoluntario, { Voluntario } from '../components/CardVoluntario';
import { carregarVoluntarios } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const VoluntariosScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);

  const fetchVoluntarios = async () => {
    const lista = await carregarVoluntarios();
    setVoluntarios(lista);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchVoluntarios();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Voluntários" subtitle="Pessoas dispostas a ajudar" />
      <View style={styles.content}>
        {voluntarios.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={GlobalStyles.textoSecundario}>
              Nenhum voluntário cadastrado.
            </Text>
          </View>
        ) : (
          <FlatList
            data={voluntarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardVoluntario voluntario={item} />}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        )}

        <TouchableOpacity
          style={[GlobalStyles.fab, { backgroundColor: Colors.primary }]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('CadastrarVoluntario')}
        >
          <Ionicons name="add" size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoluntariosScreen;

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