import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from 'components/App';
import Campaigns from 'components/Campaigns'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from 'reducers';
import { addCampaigns, populateCampaigns } from 'actions/campaigns';

import * as serviceWorker from './serviceWorker';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

// CamelCase or camelCase ???
window.AddCampaigns = window.addCampaigns = function (campaigns) {
  store.dispatch(addCampaigns(campaigns));
};

store.dispatch(populateCampaigns());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route path="/" component={Campaigns} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
