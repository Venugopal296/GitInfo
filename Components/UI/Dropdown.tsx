import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

type DropdownInterface = {
  searchBy: string;
  setSearchBy: (a: string) => void;
}

const Dropdown: React.FC<DropdownInterface> = ({searchBy, setSearchBy}) => {
  const placeholder = {
    label: 'Search by options...',
    value: null,
    color: 'gray',
  };

  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={sports}
      onValueChange={value => setSearchBy(value)}
      style={{
        ...pickerSelectStyles,
        iconContainer: {
          top: 20,
          right: 10,
        },
        placeholder: {
          color: 'gray',
          fontSize: 18,
          fontWeight: '600',
        },
      }}
      value={searchBy}
      useNativeAndroidPickerStyle={false}
      textInputProps={{ underlineColorAndroid: 'cyan' }}
      Icon={() => {
        return (
          <View
            style={{
              backgroundColor: 'transparent',
              borderTopWidth: 10,
              borderTopColor: 'white',
              borderRightWidth: 10,
              borderRightColor: 'transparent',
              borderLeftWidth: 10,
              borderLeftColor: 'transparent',
              width: 0,
              height: 0,
            }}
          />
        );;
      }}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Dropdown;
