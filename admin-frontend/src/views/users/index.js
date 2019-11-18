import React from "react";
import GraphQLClient from "../../providers/graphql";
import HeaderComponent from "../../components/header";
import FilterableSubheaderComponent from "../../components/filterable-subheader";
import UserCardComponent from "../../components/user-card";
import UserCreateModal from "../../modals/user-create";
import { H5, Text, Spinner, NonIdealState, Icon, Intent } from "@blueprintjs/core";
import "./styles.scss";

class UsersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fetchError: null,
      users: [],
      isUserCreateModalOpen: false
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
          description={<Text className="bp3-text-muted">Please wait while the users are getting loaded.</Text>}
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
          <UserCardComponent
            user={user}
            key={user.id}
          ></UserCardComponent>
        );
      });
      view = <div className="UsersViewGrid">{rows}</div>;
    }

    return (
      <div className="UsersView">
        <HeaderComponent user={this.props.user} />
        <FilterableSubheaderComponent
          heading="User Management"
          primaryIcon="new-person"
          primaryText="New User"
          primaryOnClick={() => { this.setState({ isUserCreateModalOpen: true }) }}
        />
        <div className="content-wrapper">
          <H5>All Users ({this.state.users.length})</H5>
          {view}
        </div>
        <UserCreateModal
          isOpen={this.state.isUserCreateModalOpen}  
          handleOpen={() => { this.setState({ isUserCreateModalOpen: true }) }}
          handleClose={() => { this.setState({ isUserCreateModalOpen: false }) }}
        />
      </div>
    );
  }
}

export default UsersView;