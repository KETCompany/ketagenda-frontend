import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// sessionStorage.setItem('role', 'admin');


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
