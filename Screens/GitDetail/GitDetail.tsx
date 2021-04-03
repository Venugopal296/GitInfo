import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {
  RepoDetailParams,
  SearchNavigatorParamList,
} from '../../Interfaces/Interfaces';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../Constants/Colors';
import Card from '../../Components/UI/Card';

export interface GitDetailProps {
  navigation: StackNavigationProp<SearchNavigatorParamList, 'GitDetail'>;
  route: RouteProp<SearchNavigatorParamList, 'GitDetail'>;
}

const GitDetail: React.FC<GitDetailProps> = ({ navigation, route }) => {
  const {
    params: { url },
  } = route;

  const [gitDetailData, setGitDetailData] = useState<RepoDetailParams[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url);
        setGitDetailData(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: RepoDetailParams }) => (
    <Card {...item} />
  );

  if (isLoading) {
    return (
      <LinearGradient
        colors={[Colors.primary, 'rgba(0,0,0,0.8)']}
        style={Styles.loading}
      >
        <ActivityIndicator size="large" color='white' />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary, 'rgba(0,0,0,0.8)']}
      style={Styles.gradient}
    >
      {gitDetailData.length > 0 ? (
        <FlatList
          data={gitDetailData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={Styles.detail}
        />
      ) : (
        <View style={Styles.textBox}>
          <Text style={Styles.text}>No Repo's Found...</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export const gitDetailOptions = () => {
  return {
    headerTitle: "Repo's",
  };
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

export default GitDetail;
