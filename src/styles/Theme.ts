export const Colors = {
    primary: '#1B3B6F',       // Azul Petróleo
    secondary: '#2F8F4E',     // Verde Floresta
    background: '#F5F5F5',    // Cinza Claro
    textPrimary: '#333333',   // Texto principal
    textSecondary: '#666666', // Texto secundário
    white: '#FFFFFF',
    error: '#D32F2F',         // Erro/alerta
    success: '#388E3C',       // Confirmação
  };
  
  export const Fonts = {
    heading: 'Montserrat_700Bold' as const,
    subheading: 'Montserrat_600SemiBold' as const,
    body: 'OpenSans_400Regular' as const,
    caption: 'OpenSans_300Light' as const,
  };
  

  export type ColorKey = keyof typeof Colors;
  export type FontKey = keyof typeof Fonts;