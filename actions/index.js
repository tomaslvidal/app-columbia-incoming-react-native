import * as types from '../constants/ActionTypes';

export const setLoguedAccount = item => ({
  type: types.SET_LOGUED_ACCOUNT,
  payload: item
});