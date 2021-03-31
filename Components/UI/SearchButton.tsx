import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';

interface buttonInterface {
  fetchGitInfo: () => void;
}

const SearchButton: React.FC<buttonInterface> = ({ fetchGitInfo }) => {
  return (
    <View style={Style.gitButton}>
      <Button title="Search" onPress={fetchGitInfo} color={Colors.primary} />
    </View>
  );
};

const Style = StyleSheet.create({
  gitButton: {},
});

export default SearchButton;
