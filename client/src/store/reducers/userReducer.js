import {
  LOGIN,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
} from '../actions/userActions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { userInfo: action.user };
    case LOGIN_FAIL:
      return {
        message: { id: Date.now(), status: 'error', msg: action.errMsg },
      };
    case REGISTER:
      return { message: { id: Date.now(), status: 'info', msg: action.msg } };
    case REGISTER_FAIL:
      return {
        message: { id: Date.now(), status: 'error', msg: action.errMsg },
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
