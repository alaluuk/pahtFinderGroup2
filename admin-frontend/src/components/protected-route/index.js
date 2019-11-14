import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppToaster } from "../../App";
import { fetchUser } from "../../providers/auth";
import { Spinner, Intent } from "@blueprintjs/core";

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: null
    };
    
    fetchUser()
      .then(fetchedUser => {
        this.setState({user: fetchedUser});
      })
      .catch((err) => {
        AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: "Access denied: "+err.message });
      })
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    let { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => {
        props.user = this.state.user;
        if(this.state.isLoading) return (<Spinner className="LoadingViewSpinner" size="40" />);
        return (this.state.user !== null) 
          ? (<Component {...props} />)
          : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />);
      }} />
    )
  }
}

export default ProtectedRoute;