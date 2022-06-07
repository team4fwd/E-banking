import {
  ADD_ACCOUNT,
  FAILED,
  GET_USER_ACCOUNTS,
} from '../actions/userAccountsActions';

const initialState = { accounts: [], totalAmount: 0 };

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ACCOUNTS:
      const { accounts } = action;
      const totalAmount = accounts
        .filter((account) => account.isActive)
        .reduce((sum, account) => (sum += account.amount), 0);
      return { accounts, totalAmount };
    case ADD_ACCOUNT:
      return {
        accounts: [...state.accounts, action.account],
        totalAmount: state.totalAmount + action.account.amount,
        msg: { status: 'info', msg: 'Account added successfully!' },
      };
    case FAILED:
      return {
        ...state,
        msg: { status: 'error', msg: action.msg },
      };
    default:
      return state;
  }
};

export default accountsReducer;
