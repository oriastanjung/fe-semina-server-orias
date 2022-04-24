import {
  START_FETCHING_PARTICIPANTS,
  SUCCESS_FETCHING_PARTICIPANTS,
  ERROR_FETCHING_PARTICIPANTS,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  keyword: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PARTICIPANTS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_PARTICIPANTS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_PARTICIPANTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.participants,
      };

    
    default:
      return state;
  }
}
