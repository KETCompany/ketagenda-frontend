import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

require('firebase/messaging');

const config = require('./config');

firebase.initializeApp(config);

// sessionStorage.setItem('role', 'admin');

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
