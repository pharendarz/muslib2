import React from 'react';
import ReactDOM from 'react-dom';
//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
//>>
import './index.css';
import Layout from './components/containers/Layout';
import reducers from './reducers'; //redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <Layout /> 
    </Provider>,
    document.getElementById('root')
    );
