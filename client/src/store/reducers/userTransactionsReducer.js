import { GET_TRANSACTIONS } from '../actions/userTransactionsActions';

const transactionsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      const { userTransformations_from: from, userTransformations_to: to } =
        action.transactions;
      let transactions = from.map((trans) => ({
        id: trans._id + 1,
        accountNumber:
          trans.transactionType === 'Transfer'
            ? trans.user_account_from
            : trans.user_account_to,
        amount: trans.amount,
        type: trans.transactionType,
        kind: trans.transactionType === 'Recharge' ? 'income' : 'outcome',
        date: new Date(trans.createdAt).toLocaleString('en-US'),
        receiver:
          trans.transactionType === 'Transfer' ? trans.user_account_to : '',
        sender: '-',
      }));
      transactions = [
        ...transactions,
        ...to.map((trans) => ({
          id: trans._id.slice(0, -1) + Date.now().toString()[12],
          accountNumber: trans.user_account_to,
          amount: trans.amount,
          type: trans.transactionType,
          kind: 'income',
          date: new Date(trans.createdAt).toLocaleString('en-US'),
          receiver: '-',
          sender: trans.user_account_from,
        })),
      ];
      return transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    default:
      return state;
  }
};

export default transactionsReducer;
