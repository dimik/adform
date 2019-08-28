import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from 'reducers';

export default createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? applyMiddleware(thunkMiddleware, createLogger())
    : applyMiddleware(thunkMiddleware)
);