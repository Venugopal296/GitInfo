import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Dropdown from '../../Components/UI/Dropdown';
import Input from '../../Components/UI/Input';
import Colors from '../../Constants/Colors';
import useDebounce from '../../Hooks/useDebounce';
import { GitInfoInterface, NavigationInterface } from '../../Interfaces/Interfaces';
import GitInfo from '../../Components/UI/GitInfo';

const GitSearch: React.FC<NavigationInterface> = (props) => {
  const [searchBy, setSearchBy] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [gitData, setGitData] = useState<GitInfoInterface>();
  const [error, setError] = useState('');

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      (async () => {
        setError('');
        try {
          const res = await axios.get(
            `https://api.github.com/users/${debouncedSearchTerm}`
          );
          setGitData(res.data);
        } catch (err) {
          setError('User not found');
        }
      })();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  console.log(gitData);
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.tertiary]}
      style={Styles.gradient}
    >
      <View style={Styles.searchContainer}>
        <Dropdown searchBy={searchBy} setSearchBy={setSearchBy} />
        <Input inputValue={inputValue} setInputValue={setInputValue} />
      </View>
      {inputValue !== '' && (
        <GitInfo
          name={gitData?.name}
          email={gitData?.email}
          bio={gitData?.bio}
          avatar_url={gitData?.avatar_url}
          html_url={gitData?.html_url}
          login={gitData?.login}
          public_repos={gitData?.public_repos}
          repos_url={gitData?.repos_url}
          navigate={props.navigation.navigate}
        />
      )}
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    width: '90%',
    height: '20%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    elevation: 10,
    justifyContent: 'space-evenly',
  },
});

export default GitSearch;
