import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Input from '../../Components/UI/Input';
import Colors from '../../Constants/Colors';
import useDebounce from '../../Hooks/useDebounce';
import {
  GitInfoInterface,
  SearchNavigatorParamList,
} from '../../Interfaces/Interfaces';
import GitInfo from '../../Components/UI/GitInfo';
import GitInfoData from '../../Models/GitInfoData';
import { fetchHistoryData, setHistoryData } from '../../Store/Actions/HistoryAction';
import { useDispatch } from 'react-redux';

interface GitSearchProps {
  navigation: StackNavigationProp<SearchNavigatorParamList, 'GitSearch'>;
}

const GitSearch: React.FC<GitSearchProps> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [gitData, setGitData] = useState<GitInfoInterface>(
    new GitInfoData(0, '', '', '', '', '', '', 0, '')
  );
  const [error, setError] = useState('');

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchHistoryData());
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

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

  const vistRepos = async () => {
    try{
      await dispatch(setHistoryData(gitData));
    } catch (err) {}

    navigation.navigate({
      name: 'GitDetail',
      params: {
        url: gitData.repos_url
      },
    });
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.tertiary]}
      style={Styles.gradient}
    >
      <View style={Styles.searchContainer}>
        <View style={Styles.header}>
          <Text style={Styles.headerText}>Enter Username:</Text>
        </View>
        <Input inputValue={inputValue} setInputValue={setInputValue} />
      </View>
      {inputValue !== '' && (
        <GitInfo
          id={gitData.id}
          name={gitData.name}
          email={gitData.email}
          bio={gitData.bio}
          avatar_url={gitData.avatar_url}
          html_url={gitData.html_url}
          login={gitData.login}
          public_repos={gitData.public_repos}
          repos_url={gitData.repos_url}
          vistRepos={vistRepos}
        />
      )}
    </LinearGradient>
  );
};

export const gitSearchOptions = () => {
  return {
    headerTitle: 'Git Search',
  };
};

const Styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    width: '90%',
    height: '15%',
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
