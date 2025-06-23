import { StyleSheet } from 'react-native';
import { Colors, Fonts } from './Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 0,
  },

  titulo: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.textPrimary,
  },

  subtitulo: {
    fontFamily: Fonts.subheading,
    fontSize: 18,
    color: Colors.textPrimary,
  },

  texto: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.textPrimary,
  },

  textoSecundario: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  textoErro: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.error,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  botaoPrimario: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoPrimarioText: {
    fontFamily: Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
  },

  botaoSecundario: {
    backgroundColor: Colors.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoSecundarioText: {
    fontFamily: Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});