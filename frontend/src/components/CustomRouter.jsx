import React, { Component } from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Overview from '../pages/overview';
import Landing from '../pages/landing';
import AddBuilding from '../pages/addBuilding';
import Marketplace from '../pages/marketplace';
import Wishlist from '../pages/wishlist';

class CustomRouter extends Component {
    state = {  }
    render() { 
        return (
            <Router>
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/overview" component={Overview} />
              <Route exact path ="/addbuilding" component={AddBuilding}/>
              <Route exact path ="/marketplace" component={Marketplace}/>
              <Route exact path ="/wishlist" component={Wishlist}/>

            </div>
          </Router>
        );
    }
}
 
export default CustomRouter;