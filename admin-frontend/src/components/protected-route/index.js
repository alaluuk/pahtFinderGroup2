import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { AppName, AppToaster } from "../../App";
import { fetchUser, performLogout } from "../../providers/auth";
import { Spinner, Intent } from "@blueprintjs/core";

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: null
    };
  }

  componentDidMount() {
    fetchUser()
      .then(fetchedUser => {
        this.setState({user: fetchedUser});
      })
      .catch((err) => {
        AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: "Access denied: "+err.message });
        performLogout().finally(() => this.props.history.push("/login"));
      })
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    let { component: Component, ...rest } = this.props;
    document.title = this.props.title + " | " + AppName;
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

export default withRouter(ProtectedRoute);