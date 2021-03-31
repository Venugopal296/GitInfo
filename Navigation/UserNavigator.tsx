import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../Constants/Colors';
import GitSearch from '../Screens/GitSearch/GitSearch';
import History from '../Screens/History/History';
import GitDetail from '../Screens/GitDetail/GitDetail';

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

export const GitSearchNavigator = () => {
  return (
    <SearchNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <SearchNavigator.Screen
        name="Git Search"
        component={GitSearch}
      />
      <SearchNavigator.Screen
        name="Git Detail"
        component={GitDetail}
      />
    </SearchNavigator.Navigator>
  );
};

const HistoryNavigator = createStackNavigator();

export const SearchHistoryNavigator = () => {
  return (
    <HistoryNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <HistoryNavigator.Screen
        name="History"
        component={History}
      />
    </HistoryNavigator.Navigator>
  );
};

/* Tab Navigation */

const TabNavigator = createBottomTabNavigator();

export const GitTabNavigator = () => {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontSize: 16,
        },
        labelPosition: 'below-icon',
      }}
    >
      <TabNavigator.Screen
        name="Search Repo"
        component={GitSearchNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={20} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="History"
        component={SearchHistoryNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase" color={color} size={20} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};

// /* Authentication Navigation */

// const LoginNavigator = createStackNavigator();

// export const LoginAuthNavigator = () => {
//   return (
//     <LoginNavigator.Navigator screenOptions={defaultStackNavOptions}>
//       <LoginNavigator.Screen
//         name="Login"
//         component={Login}
//         options={loginScreenOptions}
//       />
//     </LoginNavigator.Navigator>
//   );
// };
