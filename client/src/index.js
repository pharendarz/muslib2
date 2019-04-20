import React from 'react';
import ReactDOM from 'react-dom';
//redux
import { Provider } from 'react-redux';
import { createStore} from 'redux';
//>>
import './index.css';
import Layout from './components/containers/Layout';
import reducers from './reducers'; //redux

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <Layout /> 
    </Provider>,
    document.getElementById('root')
    );
