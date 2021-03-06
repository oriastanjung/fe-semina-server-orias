import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import categoriesReducer from './categories/reducer';
import notifReducer from './notif/reducer';
import speakersReducer from './speakers/reducers';
import paymentsReducer from './payments/reducers';
import participantsReducer from './participants/reducers';
import eventsReducer from './events/reducers';
import listsReducer from './lists/reducer';
import transactionsReducer from './transactions/reducers';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  notif: notifReducer,
  speakers: speakersReducer,
  payments: paymentsReducer,
  participants: participantsReducer,
  events: eventsReducer,
  lists: listsReducer,
  transactions: transactionsReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
