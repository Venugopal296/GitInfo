import { GitInfoInterface } from '../../Interfaces/Interfaces';
import actionType from '../Actions/ActionType';

export interface HistoryInitStateInterface {
  historyData: GitInfoInterface[]
}

const initialState: HistoryInitStateInterface = {
  historyData: [],
};

const historyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionType.FETCH_HISTORY_DATA:
      return {
        ...state,
        historyData: [...action.dataList],
      };

    case actionType.SET_HISTORY_DATA:
      return {
        ...state,
        historyData: [...action.dataList],
      };

    case actionType.DELETE_HISTORY_DATA:
      return {
        ...state,
        historyData: [],
      };

    case actionType.DELETE_SINGLE_USER:
      return {
        ...state,
        historyData: [...action.dataList],
      };

    default:
      return state;
  }
};

export default historyReducer;
