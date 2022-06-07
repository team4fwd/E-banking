import {
  ADD_ACCOUNT,
  DEPOSIT_INTO_ACCOUNT,
  FAILED,
  GET_USER_ACCOUNTS,
  WITHDRAW_FROM_ACCOUNT,
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
        message: {
          id: Date.now(),
          status: 'info',
          msg: 'Account added successfully!',
        },
      };
    case WITHDRAW_FROM_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter((acc) => acc._id !== action.account._id),
          action.account,
        ],
        message: {
          id: Date.now(),
          status: 'info',
          msg: 'Amount withdrow successfully!',
        },
      };
    case DEPOSIT_INTO_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter((acc) => acc._id !== action.account._id),
          action.account,
        ],
        message: {
          id: Date.now(),
          status: 'info',
          msg: 'Amount added successfully!',
        },
      };
    case FAILED:
      return {
        ...state,
        message: { id: Date.now(), status: 'error', msg: action.msg },
      };
    default:
      return state;
  }
};

export default accountsReducer;
