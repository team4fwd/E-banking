import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { LogInAPI, SignUpAPI } from '../../util/API';
import { clearAccounts } from './userAccountsActions';

const LOGIN = 'LOGIN';
const LOGIN_FAIL = 'LOGIN_FAIL';
const REGISTER = 'REGISTER';
const REGISTER_FAIL = 'REGISTER_FAIL';
const LOGOUT = 'LOGOUT';

const logUserIn = (user) => ({
  type: LOGIN,
  user,
});

const loginFailed = (errMsg) => ({
  type: LOGIN_FAIL,
  errMsg,
});

const register = (msg) => ({
  type: REGISTER,
  msg,
});

const registerFailed = (errMsg) => ({
  type: REGISTER_FAIL,
  errMsg,
});

const logUserOut = () => ({
  type: LOGOUT,
});

const loginUser = (userInfo) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { user, error } = await LogInAPI(userInfo);
    dispatch(hideLoading());
    if (error) throw new Error(error);
    if (user) {
      dispatch(logUserIn(user));
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  } catch (err) {
    dispatch(loginFailed(err.message));
  }
};

const registerUser = (userInfo) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { error, msg } = await SignUpAPI(userInfo);
    dispatch(hideLoading());
    if (error) throw new Error(error);
    if (msg) dispatch(register(msg));
  } catch (err) {
    dispatch(registerFailed(err.message));
  }
};

const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(logUserOut());
  dispatch(clearAccounts());
};

export {
  LOGIN,
  LOGIN_FAIL,
  REGISTER,
  REGISTER_FAIL,
  LOGOUT,
  loginUser,
  logoutUser,
  registerUser,
};
