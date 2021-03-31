import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GitTabNavigator } from './UserNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <GitTabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
