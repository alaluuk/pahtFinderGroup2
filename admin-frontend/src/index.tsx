import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/global-styles.scss';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();