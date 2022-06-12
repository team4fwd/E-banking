import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { MyTransactionsAPI } from '../../util/API';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const FAILED = 'FAILED';

const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  transactions,
});

const Failed = (msg) => ({
  type: FAILED,
  msg,
});

const getUserTransactions = (token) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { transactions, error } = await MyTransactionsAPI(token);
    dispatch(hideLoading());
    if (error) throw new Error(error);
    dispatch(getTransactions(transactions));
  } catch (err) {
    dispatch(Failed(err.message));
  }
};

export { GET_TRANSACTIONS, FAILED, getUserTransactions };
