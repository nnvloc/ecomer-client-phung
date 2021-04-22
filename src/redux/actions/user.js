import {
  USER_LOGIN_SUCCESS
} from '../constants';

export const setUser = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: payload,
  }
} 
