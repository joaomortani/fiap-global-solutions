import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>CuidarColetivo</Text>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && (
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  appName: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
});

export default ScreenHeader; 