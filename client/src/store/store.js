import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from './reducers/userReducer';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadingBarReducer } from 'react-redux-loading-bar';
import accountsReducer from './reducers/userAccountsReducer';

const reducer = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
  form: formReducer,
  loadingBar: loadingBarReducer,
});

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  user: { userInfo },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
