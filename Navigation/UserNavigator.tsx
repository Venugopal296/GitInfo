import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../Constants/Colors';
import GitSearch, {gitSearchOptions} from '../Screens/GitSearch/GitSearch';
import History from '../Screens/History/History';
import GitDetail, { gitDetailOptions } from '../Screens/GitDetail/GitDetail';
import { HistoryNavigatorParamList, SearchNavigatorParamList } from '../Interfaces/Interfaces';

const defaultStackNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: Colors.primary,
  headerTitleStyle: {
    fontWeight: '600',
  },
  headerBackTitle: 'back',
  cardShadowEnabled: true,
};

const SearchNavigator = createStackNavigator();

export const GitSearchNavigator: React.FC = () => {
  const { Navigator, Screen } = SearchNavigator;

  return (
    <Navigator screenOptions={defaultStackNavOptions}>
      <Screen name="GitSearch" component={GitSearch} options={gitSearchOptions} />
      <Screen name="GitDetail" component={GitDetail} options={gitDetailOptions} />
    </Navigator>
  );
};

const HistoryNavigator = createStackNavigator();

export const SearchHistoryNavigator: React.FC = () => {
  const { Navigator, Screen } = HistoryNavigator;
  return (
    <Navigator screenOptions={defaultStackNavOptions}>
      <Screen name="History" component={History} />
      <Screen name="GitDetail" component={GitDetail} options={gitDetailOptions} />
    </Navigator>
  );
};

/* Tab Navigation */

const TabNavigator = createBottomTabNavigator();

export const GitTabNavigator: React.FC = () => {
  const { Navigator, Screen } = TabNavigator;
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontSize: 16,
        },
        labelPosition: 'below-icon',
      }}
    >
      <Screen
        name="Search Repo"
        component={GitSearchNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={20} />
          ),
        }}
      />
      <Screen
        name="History"
        component={SearchHistoryNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase" color={color} size={20} />
          ),
        }}
      />
    </Navigator>
  );
};
