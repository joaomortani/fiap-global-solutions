import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts } from '../styles/Theme';
import NewAlertDialog from './NewAlertDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const CustomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  // Controla exibição do modal de novo alerta
  const [dialogVisible, setDialogVisible] = useState(false);

  // Animações para cada aba
  const scales = useRef<Animated.Value[]>(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  // Animações para hover effects
  const hoverScales = useRef<Animated.Value[]>(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  const hoverOpacities = useRef<Animated.Value[]>(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  // Animações para o botão "+"
  const plusRotation = useRef(new Animated.Value(0)).current;
  const plusScale = useRef(new Animated.Value(1)).current;
  const plusPulse = useRef(new Animated.Value(1)).current;
  const plusHoverScale = useRef(new Animated.Value(1)).current;

  // Animação da TabBar aparecer
  const tabBarOpacity = useRef(new Animated.Value(0)).current;
  const tabBarTranslateY = useRef(new Animated.Value(50)).current;

  // Animação dos ícones para quando mudam de aba
  const iconOpacities = useRef<Animated.Value[]>(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  // Animação de entrada da TabBar
  useEffect(() => {
    Animated.parallel([
      Animated.timing(tabBarOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(tabBarTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  }, []);

  // Animação contínua do botão "+"
  useEffect(() => {
    const createPulseAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(plusPulse, {
            toValue: 1.1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(plusPulse, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const pulseAnimation = createPulseAnimation();
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  // Quando um alerta é salvo, emitimos evento para recarregar lista de notificações
  const handleAlertSaved = () => {
    navigation.emit({ type: 'customAlertSaved' });
  };

  // Hover effects para abas normais
  const handlePressIn = (index: number) => {
    Animated.parallel([
      Animated.spring(hoverScales[index], {
        toValue: 1.05,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(hoverOpacities[index], {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = (index: number) => {
    Animated.parallel([
      Animated.spring(hoverScales[index], {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(hoverOpacities[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Hover effects para o botão +
  const handlePlusPressIn = () => {
    Animated.spring(plusHoverScale, {
      toValue: 1.1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePlusPressOut = () => {
    Animated.spring(plusHoverScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  // Animação do botão "+" quando pressionado
  const handlePlusPress = () => {
    Animated.parallel([
      Animated.timing(plusRotation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(plusScale, {
        toValue: 0.9,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
    ]).start(() => {
      // Reset animations
      Animated.parallel([
        Animated.timing(plusRotation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(plusScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }),
      ]).start();
    });

    setDialogVisible(true);
  };

  // Quando o usuário pressiona uma aba
  const handlePress = (route: any, index: number) => {
    // Animação da aba pressionada
    Animated.parallel([
      Animated.spring(scales[index], {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(iconOpacities[index], {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.spring(scales[index], {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }),
        Animated.timing(iconOpacities[index], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Animação sutil das outras abas
    state.routes.forEach((_: any, i: number) => {
      if (i !== index) {
        Animated.timing(iconOpacities[i], {
          toValue: 0.6,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(iconOpacities[i], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
      }
    });

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <>
      {/* Modal para criar novo alerta */}
      {dialogVisible && (
        <NewAlertDialog
          visible={dialogVisible}
          onClose={() => setDialogVisible(false)}
          onSaved={handleAlertSaved}
        />
      )}

      {/* A View que envolve toda a Tab Bar */}
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: tabBarOpacity,
            transform: [{ translateY: tabBarTranslateY }],
          },
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          // Nova estrutura: Home | Notificações | + | Recursos | Voluntários
          // Rota "Home" → index 0
          // Rota "Notificacoes" → index 1  
          // Rota "Recursos" → index 2
          // Rota "Voluntarios" → index 3

          if (index === 1) {
            // Renderiza Notificações e depois o botão "+"
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            return (
              <React.Fragment key={route.key}>
                <Pressable
                  onPress={() => handlePress(route, index)}
                  onPressIn={() => handlePressIn(index)}
                  onPressOut={() => handlePressOut(index)}
                  style={styles.tabItem}
                >
                  <Animated.View 
                    style={{ 
                      transform: [
                        { scale: Animated.multiply(scales[index], hoverScales[index]) }
                      ],
                      opacity: Animated.multiply(iconOpacities[index], hoverOpacities[index]),
                    }}
                  >
                    <Ionicons
                      name="notifications"
                      size={24}
                      color={isFocused ? Colors.primary : Colors.textSecondary}
                    />
                  </Animated.View>
                  <Animated.Text
                    style={[
                      styles.tabLabel,
                      { 
                        color: isFocused ? Colors.primary : Colors.textSecondary,
                        opacity: Animated.multiply(iconOpacities[index], hoverOpacities[index]),
                      },
                    ]}
                  >
                    Notificações
                  </Animated.Text>
                </Pressable>

                {/* Botão "+" no centro */}
                <View key="plus-button" style={styles.plusSlot}>
                  <Pressable 
                    onPress={handlePlusPress}
                    onPressIn={handlePlusPressIn}
                    onPressOut={handlePlusPressOut}
                  >
                    <Animated.View 
                      style={[
                        styles.plusButton,
                        {
                          transform: [
                            { scale: Animated.multiply(
                                Animated.multiply(plusScale, plusPulse), 
                                plusHoverScale
                              ) 
                            },
                            { 
                              rotate: plusRotation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '45deg'],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Ionicons name="add" size={32} color={Colors.white} />
                    </Animated.View>
                  </Pressable>
                </View>
              </React.Fragment>
            );
          }

          // Para os outros índices (0, 2, 3), renderizamos normalmente:
          // index 0 → Home; index 2 → Recursos; index 3 → Voluntários
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          let iconName = 'circle';
          let IconComponent: any = Ionicons;
          let label = '';

          if (route.name === 'Home') {
            iconName = 'home';
            IconComponent = Ionicons;
            label = 'Home';
          } else if (route.name === 'Recursos') {
            iconName = 'gift';
            IconComponent = MaterialCommunityIcons;
            label = 'Recursos';
          } else if (route.name === 'Voluntarios') {
            iconName = 'people';
            IconComponent = Ionicons;
            label = 'Voluntários';
          }

          return (
            <Pressable
              key={route.key}
              onPress={() => handlePress(route, index)}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              style={styles.tabItem}
            >
              <Animated.View 
                style={{ 
                  transform: [
                    { scale: Animated.multiply(scales[index], hoverScales[index]) }
                  ],
                  opacity: Animated.multiply(iconOpacities[index], hoverOpacities[index]),
                }}
              >
                <IconComponent
                  name={iconName as any}
                  size={24}
                  color={isFocused ? Colors.primary : Colors.textSecondary}
                />
              </Animated.View>
              <Animated.Text
                style={[
                  styles.tabLabel,
                  { 
                    color: isFocused ? Colors.primary : Colors.textSecondary,
                    opacity: Animated.multiply(iconOpacities[index], hoverOpacities[index]),
                  },
                ]}
              >
                {label}
              </Animated.Text>
            </Pressable>
          );
        })}
      </Animated.View>
    </>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: Colors.white,
    elevation: 4,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: Fonts.body,
    fontSize: 10,
    marginTop: 2,
  },
  plusSlot: {
    width: 64,           // Largura fixa para o slot do "+"
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DC2626', // Vermelho urgente ao invés do azul
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? -20 : -16, // eleva acima da TabBar
    elevation: 6, // Aumentei a elevação para dar mais destaque
    shadowColor: '#DC2626', // Sombra vermelha para reforçar urgência
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});