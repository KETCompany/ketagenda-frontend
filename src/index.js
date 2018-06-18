import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';


import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

require('firebase/messaging');

const config = {
    apiKey: "AIzaSyA8w6TLfd38Qgl1tXEy4uLv7MR2jQW3kf0",
    authDomain: "ketagenda-96c0d.firebaseapp.com",
    databaseURL: "https://ketagenda-96c0d.firebaseio.com",
    projectId: "ketagenda-96c0d",
    storageBucket: "ketagenda-96c0d.appspot.com",
    messagingSenderId: "598561209308"
};


firebase.initializeApp(config);

// sessionStorage.setItem('role', 'admin');

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
