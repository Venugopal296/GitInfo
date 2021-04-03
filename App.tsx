import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { HistoryNavigatorParamList } from './Interfaces/Interfaces';

import RootNavigator from './Navigation/RootNavigator';
import historyReducer from './Store/Reducers/HistoryReducers';

const store = createStore(historyReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
};

export default App;
