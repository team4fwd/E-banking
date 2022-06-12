import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { AddAccountAPI, MyAccountsAPI, operateMoneyAPI } from '../../util/API';

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

const withdraw = (account) => ({
  type: WITHDRAW_FROM_ACCOUNT,
  account,
});

const deposit = (account) => ({
  type: DEPOSIT_INTO_ACCOUNT,
  account,
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

const operateMoney = (type, id, amount, token) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { account, error } = await operateMoneyAPI(type, id, amount, token);
    dispatch(hideLoading());
    if (error) throw new Error(error);
    if (type === 'withdrow') dispatch(withdraw(account));
    if (type === 'recharge') dispatch(deposit(account));
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
  operateMoney,
};
