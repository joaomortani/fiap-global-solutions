import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Fonts } from '../styles/Theme';

type Props = TextInputProps & {
  label: string;
  errorMessage?: string;
};

const InputField: React.FC<Props> = ({ label, errorMessage, style, ...textInputProps }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.textSecondary}
        {...textInputProps}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    fontFamily: Fonts.subheading,
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  error: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    color: Colors.error,
    marginTop: 2,
  },
});