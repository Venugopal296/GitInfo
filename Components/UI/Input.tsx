import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface inputInterface {
  inputValue: string,
  setInputValue: (a: string) => void
};

const Input: React.FC<inputInterface> = ({inputValue, setInputValue}) => {
  return (
    <View>
      <TextInput
        style={Styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Enter Username..."
        placeholderTextColor="gray"
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'white'
  }
});

export default Input;
