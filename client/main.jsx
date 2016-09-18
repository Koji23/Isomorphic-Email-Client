import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app.jsx';
import { reducer } from './reducers/reducer';

const props = window.PROPS;
const middleware = [ReduxPromise];
const store = createStore(reducer, applyMiddleware(...middleware));

const ProvidedApp = () => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

ReactDOM.render(<ProvidedApp />, document); // rendering to the top level 'document' node is valide since the component renders a full html page. Otherwise there would be an invariant error here