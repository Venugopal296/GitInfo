import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Alert } from 'react-native';
import Colors from '../../Constants/Colors';
import {
  GitInfoInterface,
  HistoryNavigatorParamList,
} from '../../Interfaces/Interfaces';
import HistoryCard from '../../Components/UI/HistoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryInitStateInterface } from '../../Store/Reducers/HistoryReducers';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/HeaderButton';
import { deleteHistoryData } from '../../Store/Actions/HistoryAction';

interface GitSearchProps {
  navigation: StackNavigationProp<HistoryNavigatorParamList, 'History'>;
}

const History: React.FC<GitSearchProps> = ({ navigation }) => {
  const historyData = useSelector(
    (state: HistoryInitStateInterface) => state.historyData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Clear History"
            onPress={clearHistory}
            color={Colors.primary}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const clearHistory = async () => {
    Alert.alert('Caution!', 'Are you sure want to clear history', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(deleteHistoryData());
          } catch (err) {}
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: GitInfoInterface }) => (
    <HistoryCard {...item} detailRepo={() => vistRepos(item)} />
  );

  const vistRepos = (item: GitInfoInterface) => {
    navigation.navigate({
      name: 'GitDetail',
      params: {
        url: item.repos_url,
      },
    });
  };

  return (
    <LinearGradient
      colors={[Colors.primary, 'rgba(0,0,0,0.8)']}
      style={Styles.gradient}
    >
      {historyData.length > 0 ? (
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={Styles.detail}
        />
      ) : (
        <View style={Styles.textBox}>
          <Text style={Styles.text}>No History...</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  detail: {
    flex: 1,
    padding: 10,
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default History;
