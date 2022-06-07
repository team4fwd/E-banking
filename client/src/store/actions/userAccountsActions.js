import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { AddAccountAPI, MyAccountsAPI } from '../../util/API';

const ADD_ACCOUNT = 'ADD_ACCOUNT';
const GET_USER_ACCOUNTS = 'GET_USER_ACCOUNTS';
const DEPOSIT_INTO_ACCOUNT = 'DEPOSIT_INTO_ACCOUNT';
const WITHDRAW_FROM_ACCOUNT = 'WITHDRAW_FROM_ACCOUNT';
const TRANSFER_TO_ACCOUNT = 'TRANSFER_TO_ACCOUNT';
const FAILED = 'FAILED';

const addNewAccount = (account) => ({
  type: ADD_ACCOUNT,
  account,
});

const getAllAccounts = (accounts) => ({
  type: GET_USER_ACCOUNTS,
  accounts,
});

const accountFailed = (msg) => ({
  type: FAILED,
  msg,
});

const getUserAccounts = (token) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { accounts, error } = await MyAccountsAPI(token);
    dispatch(hideLoading());
    if (error) throw new Error(error);
    dispatch(getAllAccounts(accounts));
  } catch (err) {
    dispatch(accountFailed(err.message));
  }
};

const addUserAccount = (token) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { account, error } = await AddAccountAPI(token);
    dispatch(hideLoading());
    if (error) throw new Error(error);
    dispatch(addNewAccount(account));
  } catch (err) {
    dispatch(accountFailed(err.message));
  }
};

export {
  ADD_ACCOUNT,
  GET_USER_ACCOUNTS,
  DEPOSIT_INTO_ACCOUNT,
  WITHDRAW_FROM_ACCOUNT,
  TRANSFER_TO_ACCOUNT,
  FAILED,
  getUserAccounts,
  addUserAccount,
};
