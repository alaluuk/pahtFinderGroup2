import React from "react";
import { Route } from "react-router-dom";
import { AppName } from "../../App";
import { fetchUser } from "../../providers/auth";

class PublicRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetchUser()
      .then(fetchedUser => {
        this.setState({user: fetchedUser});
      })
      .catch((err) => {})
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    let { component: Component, ...rest } = this.props;
    document.title = this.props.title + " | " + AppName;
    return (
      <Route {...rest} render={(props) => {
        props.user = this.state.user;
        return (<Component {...props} />);
      }} />
    )
  }
}

export default PublicRoute;