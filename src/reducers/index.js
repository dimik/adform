import { combineReducers } from 'redux';
import navigation from './navigation';
import campaigns from './campaigns';
import search from './search';
import storage from './storage';

export default combineReducers({
  navigation,
  campaigns,
  search,
  storage,
});