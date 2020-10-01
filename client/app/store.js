import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { loadLibrary } from './actions/libraryActions';
import { getUsername } from './actions/userActions';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch(loadLibrary());
store.dispatch(getUsername());

export default store;
