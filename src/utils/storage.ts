// src/utils/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_RECURSOS = '@cuidarcoletivo_recursos';
const KEY_VOLUNTARIOS = '@cuidarcoletivo_voluntarios';

export interface Recurso {
  id: number;
  nome: string;
  tipo: string;
  quantidade: string;
  endereco: string;
}

export interface Voluntario {
  id: number;
  nome: string;
  tipoAjuda: string;
  regiao: string;
  contato: string;
}

// Salva um novo recurso no AsyncStorage
export async function salvarRecurso(recurso: Recurso): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(KEY_RECURSOS);
    const lista: Recurso[] = json ? JSON.parse(json) : [];
    lista.push(recurso);
    await AsyncStorage.setItem(KEY_RECURSOS, JSON.stringify(lista));
  } catch (error) {
    console.error('Erro ao salvar recurso:', error);
  }
}

// Carrega todos os recursos salvos
export async function carregarRecursos(): Promise<Recurso[]> {
  try {
    const json = await AsyncStorage.getItem(KEY_RECURSOS);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar recursos:', error);
    return [];
  }
}

// Salva um novo voluntário no AsyncStorage
export async function salvarVoluntario(voluntario: Voluntario): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(KEY_VOLUNTARIOS);
    const lista: Voluntario[] = json ? JSON.parse(json) : [];
    lista.push(voluntario);
    await AsyncStorage.setItem(KEY_VOLUNTARIOS, JSON.stringify(lista));
  } catch (error) {
    console.error('Erro ao salvar voluntário:', error);
  }
}

// Carrega todos os voluntários salvos
export async function carregarVoluntarios(): Promise<Voluntario[]> {
  try {
    const json = await AsyncStorage.getItem(KEY_VOLUNTARIOS);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar voluntários:', error);
    return [];
  }
}