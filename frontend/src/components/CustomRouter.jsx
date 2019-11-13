import React, { Component } from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Overview from '../pages/overview';
import Landing from '../pages/landing';
import AddBuilding from '../pages/addBuilding';

class CustomRouter extends Component {
    state = {  }
    render() { 
        return (
            <Router>
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/overview" component={Overview} />
              <Route exact path ="/addbuilding" component={AddBuilding}/>
            </div>
          </Router>
        );
    }
}
 
export default CustomRouter;