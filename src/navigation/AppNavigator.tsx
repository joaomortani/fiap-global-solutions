import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Colors, Fonts } from '../styles/Theme';
import DashboardScreen from '../screens/DashboardScreen';
import NotificacoesScreen from '../screens/NotificationScreen';
import VoluntariosScreen from '../screens/VoluntariosScreen';
import RecursosScreen from '../screens/RecursosScreen';
import CadastrarRecursoScreen from '../screens/CadastrarRecursoScreen';
import CadastrarVoluntarioScreen from '../screens/CadastrarVoluntarioScreen';

import CustomTabBar from '../components/CustomTabBar';

export type RootStackParamList = {
  HomeTabs: undefined;
  CadastrarRecurso: undefined;
  CadastrarVoluntario: undefined;
  // Caso queira navegar diretamente a “Notificacoes” via Stack:
  Notificacoes: undefined;
};

export type HomeTabsParamList = {
  Home: undefined;
  Notificacoes: undefined;
  Recursos: undefined;
  Voluntarios: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabsParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // Aqui é o ponto-chave: substituímos o tabBar padrão pelo nosso CustomTabBar
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Notificacoes"
        component={NotificacoesScreen}
        options={{ tabBarLabel: 'Notificações' }}
      />
      <Tab.Screen
        name="Recursos"
        component={RecursosScreen}
        options={{ tabBarLabel: 'Recursos' }}
      />
      <Tab.Screen
        name="Voluntarios"
        component={VoluntariosScreen}
        options={{ tabBarLabel: 'Voluntários' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontFamily: Fonts.subheading, fontSize: 18 },
        }}
      >
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notificacoes"
          component={NotificacoesScreen}
          options={{ title: 'Notificações' }}
        />
        <Stack.Screen
          name="CadastrarRecurso"
          component={CadastrarRecursoScreen}
          options={{ title: 'Cadastrar Recurso' }}
        />
        <Stack.Screen
          name="CadastrarVoluntario"
          component={CadastrarVoluntarioScreen}
          options={{ title: 'Cadastrar Voluntário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}