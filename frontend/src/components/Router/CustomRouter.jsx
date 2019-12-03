import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Overview from '../../pages/overview';
import Landing from '../../pages/landing';
import EditBuildingPage from '../../pages/addBuilding';
import Marketplace from '../../pages/marketplace';
import Wishlist from '../../pages/wishlist';
import Building from '../../pages/building';
import SignIn from '../../pages/signin';
import PageNotFound from './pageNotFound';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../../constants'





class CustomRouter extends Component {
  state = {}
  render() {

    const PrivateRoute = ({ isLoggedIn, ...props }) => (
    localStorage.getItem(AUTH_TOKEN)
      ? <Route { ...props } />
      : <Redirect to="/signin" />
    )
    
    return (
      <div>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={SignIn} />
            <PrivateRoute exact path="/overview" component={Overview} />
            <PrivateRoute exact path="/addbuilding" component={EditBuildingPage} />
            <PrivateRoute exact path="/marketplace" component={Marketplace} />
            <PrivateRoute exact path="/wishlist" component={Wishlist} />
            <PrivateRoute exact path="/building123" component={Building} />
            <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default CustomRouter;