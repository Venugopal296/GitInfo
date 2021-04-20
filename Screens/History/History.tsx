import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import AppleStyleSwipeableRow from '../../Components/UI/AppleStyleSwipeableRow';
import CustomHeaderButton from '../../Components/UI/HeaderButton';
import HistoryCard from '../../Components/UI/HistoryCard';
import Colors from '../../Constants/Colors';
import {
  GitInfoInterface,
  HistoryNavigatorParamList
} from '../../Interfaces/Interfaces';
import { deleteHistoryData, deleteSingleUser } from '../../Store/Actions/HistoryAction';
import { HistoryInitStateInterface } from '../../Store/Reducers/HistoryReducers';


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
            title='Clear History'
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

  const deleteEntry = async (login: string) => {
    Alert.alert('Caution!', 'Are you sure want to delete', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(deleteSingleUser(login));
          } catch (err) {}
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: GitInfoInterface }) => (
    // <GmailStyleSwipeableRow>
    <AppleStyleSwipeableRow deleteEntry={() => deleteEntry(item.login)}>
      <HistoryCard {...item} detailRepo={() => vistRepos(item)} />
    </AppleStyleSwipeableRow>
    // </GmailStyleSwipeableRow>
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
