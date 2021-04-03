import axios from 'axios';
import ActionType from './ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GitInfoInterface } from '../../Interfaces/Interfaces';

export const fetchHistoryData = () => {
  return async (dispatch: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem('git_info');
      const dataArray = jsonValue != null ? JSON.parse(jsonValue) : [];

      dispatch({
        type: ActionType.FETCH_HISTORY_DATA,
        dataList: dataArray,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setHistoryData = (gitData: GitInfoInterface) => {
  return async (dispatch: any, getState: any) => {
    const dataArray: GitInfoInterface[] = getState().historyData;

    if (dataArray.length > 0) {
      const hasEl = dataArray.some(el => el.login === gitData.login);
      if (!hasEl) {
        dataArray.push(gitData);
      }
    } else {
      dataArray.push(gitData);
    }

    try {
      await AsyncStorage.removeItem('git_info');
      const jsonValue = JSON.stringify(dataArray);
      await AsyncStorage.setItem('git_info', jsonValue);
      dispatch({
        type: ActionType.SET_HISTORY_DATA,
        dataList: dataArray,
      });
    } catch (e) {}
  };
};

export const deleteHistoryData = () => {
  return async (dispatch: any) => {
    try {
      await AsyncStorage.removeItem('git_info');
      dispatch({
        type: ActionType.DELETE_HISTORY_DATA,
      });
    } catch (e) {}
  };
};

export const deleteSingleUser = (login: string) => {
  return async (dispatch: any, getState: any) => {
    const dataArray: GitInfoInterface[] = getState().historyData;
    let newData: GitInfoInterface[] = [];
    if (dataArray.length > 0) {
      newData = dataArray.filter(el => el.login !== login);
    }

    try {
      await AsyncStorage.removeItem('git_info');
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('git_info', jsonValue);
      dispatch({
        type: ActionType.DELETE_SINGLE_USER,
        dataList: newData,
      });
    } catch (e) {}
  };
};
