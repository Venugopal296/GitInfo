import React from 'react';
import { TextInput, View, StyleSheet, useWindowDimensions } from 'react-native';

interface inputInterface {
  inputValue: string,
  setInputValue: (a: string) => void
};

const Input: React.FC<inputInterface> = ({inputValue, setInputValue}) => {
  const { width , height } = useWindowDimensions();

  let inputStyle = Styles.input;
  if(height < 737) {
    inputStyle = {...inputStyle, ...Styles.input_h_737}
  }

  return (
    <View>
      <TextInput
        style={inputStyle}
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
    height: 55,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 20,
    color: 'white'
  },
  input_h_737: {
    height: 40,
    fontSize: 16,
  }
});

export default Input;
