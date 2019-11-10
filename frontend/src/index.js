import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Overview from './pages/overview';
import Landing from './pages/landing';
import AddBuilding from './pages/addBuilding';
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path ="/addbuilding" component={AddBuilding}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 