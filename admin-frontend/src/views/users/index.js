import React from "react";
import GraphQLClient from '../../providers/graphql';
import HeaderComponent from "../../components/header";
import { H3, H5, Text, Tag, Spinner, NonIdealState, Card, Elevation, Icon, Intent } from "@blueprintjs/core";
import "./styles.scss";

class UsersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fetchError: null,
      users: []
    };

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      GraphQLClient.request(`
        query {
          users {
            id
            name
            email
            role
            permissions
          }
        }
      `)
        .then(data => {
          this.setState({ users: data.users });
          resolve(data.users);
        })
        .catch(err => {
          this.setState({ fetchError: err });
          reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    let view;
    if(this.state.isLoading) {
      view = (
        <NonIdealState
          icon={<Spinner size="30"></Spinner>}
          title="Fetching Users..."
          description={<Text className="bp3-text-muted">Please wait while the users get loaded.</Text>}
        />
      );
    } else if(this.state.fetchError) {
      view = (
        <NonIdealState
          icon={<Icon icon="issue" iconSize="30" intent={Intent.DANGER} />}
          title="Error while fetching the users!"
          description={<Text className="bp3-text-muted">{
            (this.state.fetchError.response) ? this.state.fetchError.response.errors.map((err) => err.message+" ") : this.state.fetchError.message
          }</Text> }
        />
      );
    } else {
      let rows = [];
      this.state.users.forEach(user => {
        rows.push(
        <Card elevation={Elevation.TWO}>
          <H5>{user.name} <Tag className={"role-tag-"+user.role} minimal={true}>{user.role}</Tag></H5>
          <Text className="bp3-text-muted" ellipsize={true}>{user.email}</Text>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </Card>
        );
      });
    view = <div className="UsersViewGrid">{rows}</div>;
    }

    return (
      <div className="UsersView">
        <HeaderComponent user={this.props.user}></HeaderComponent>
        <div className="content-wrapper">
          <H3>Users View</H3>
          {view}
        </div>
      </div>
    );
  }
}

export default UsersView;