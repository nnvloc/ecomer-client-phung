import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from '../constants';

const initialState = {
  user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      const {payload} = action;
      return {...state, user: payload};
    case "LogOut":
      return {...state, user: null}
    default:
      return state;
  }
};

export default UserReducer;
