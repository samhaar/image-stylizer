import { combineReducers } from 'redux';
import userReducer from './userReducer';
import stylizerReducer from './stylizerReducer';
import libraryReducer from './libraryReducer';

export default combineReducers({
  user: userReducer,
  stylizer: stylizerReducer,
  library: libraryReducer,
});
