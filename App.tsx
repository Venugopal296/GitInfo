import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RootNavigator from './Navigation/RootNavigator';

const App = () => {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
