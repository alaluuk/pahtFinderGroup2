import React from "react";
import { Route, Redirect } from "react-router-dom";
import GraphQLClient from "../../providers/graphql";
import HeaderComponent from "../../components/header";
import FilterableSubheaderComponent from "../../components/filterable-subheader";
import UserCardComponent from "../../components/user-card";
import UserCreateModal from "../../modals/user-create";
import UserEditModal from "../../modals/user-edit";
import UserDeleteModal from "../../modals/user-delete";
import { Button, H5, Text, Spinner, NonIdealState, Icon, Intent } from "@blueprintjs/core";
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

  getUserIndex(id) {
    for (let i = 0; i < this.state.users.length; i++) {
      if(this.state.users[i].id === id) return i;
    }
    return undefined;
  }

  fetchUsers() {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      GraphQLClient.request(`
        query {
          users(
            query: {
              sort: [{ id: "name", desc: false }]
            }
          ) {
            id
            name
            email
            role
            permissions
            createdAt
            updatedAt
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
      view = <div className="UsersViewGrid">{this.state.users.map(user =>
        <UserCardComponent
          user={user}
          key={user.id}
          onEditClick={() => this.props.history.replace(this.props.match.url+'/edit/'+user.id, { user: user })}
          onDeleteClick={() => this.props.history.replace(this.props.match.url+'/delete/'+user.id, { user: user })}
        />
      )}</div>;
    }

    return (
      <div className="UsersView">
        <HeaderComponent user={this.props.user} />
        <FilterableSubheaderComponent
          heading="User Management"
          primaryAction={
            <Button
              icon="new-person"
              text="New User"
              intent={Intent.SUCCESS}
              onClick={() => { this.props.history.replace(this.props.match.url+'/create') }}
            />
          }
        />
        <div className="content-wrapper">
          <H5>All Users ({this.state.users.length})</H5>
          {view}
        </div>

        <Route
          path={`${this.props.match.url}/create`}
          render={() => {
            return (
              <UserCreateModal
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onCreated={user => {
                  this.props.history.replace(this.props.match.url);
                  let newUsers = [...this.state.users];
                  newUsers.push(user);
                  newUsers.sort(function(a, b) {
                    return ('' + a.name).localeCompare(b.name);
                  });
                  this.setState({users: newUsers});
                }}
              />
            );
          }}
        />

        <Route
          path={`${this.props.match.url}/edit/:userId`}
          render={({location, match}) => {
            let user = undefined;
            let userIndex = this.getUserIndex(match.params.userId);
            if(userIndex !== undefined) user = this.state.users[userIndex];
            return (user) ? (
              <UserEditModal
                user={user}
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onEdited={(user) => {
                  if(userIndex !== undefined) {
                    let newUsers = [...this.state.users];
                    newUsers[userIndex] = user;
                    this.setState({ users: newUsers });
                  }
                  this.props.history.replace(this.props.match.url);
                }}
              />
            ) : ( <Redirect to={{ pathname: this.props.match.url }} /> );
          }}
        />

        <Route
          path={`${this.props.match.url}/delete/:userId`}
          render={({location, match}) => {
            let user = undefined;
            let userIndex = this.getUserIndex(match.params.userId);
            if(userIndex !== undefined) user = this.state.users[userIndex];
            return (user) ? (
              <UserDeleteModal
                user={user}
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onDeleted={(data) => {
                  if(userIndex !== undefined) {
                    let newUsers = [...this.state.users];
                    newUsers.splice(userIndex, 1);
                    this.setState({ users: newUsers });
                  }
                  this.props.history.replace(this.props.match.url);
                }}
              />
            ) : ( <Redirect to={{ pathname: this.props.match.url }} /> );
          }}
        />
      </div>
    );
  }
}

export default UsersView;