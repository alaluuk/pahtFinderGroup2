import React from "react";
import GraphQLClient from '../../providers/graphql';
import { AppToaster } from '../../App';
import { Button, Intent, Dialog, Classes, FormGroup, InputGroup, Tooltip, HTMLSelect } from "@blueprintjs/core";
import "./styles.scss";

class UserEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      isLoading: false,
      showPassword: false,
      values: props.user, // {},
      errors: {}
    };

    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.isOpen) state.isOpen = props.isOpen;
    return state;
  }

  reset() {
    this.setState({
      isLoading: false,
      values: this.props.user, // {},
      errors: {}
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, errors: {} });
      GraphQLClient.request(`
      mutation($id: ID!, $name: String, $email: String, $password: String, $role: String) {
        updateUser(
          id: $id,
          name: $name,
          email: $email,
          password: $password,
          role: $role
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
    `, this.state.values)
        .then(data => {
          if(this.props.onEdited) this.props.onEdited(data.updateUser);
          AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Saved changes to \""+data.updateUser.name+"\"!" });
          resolve(data);
        })
        .catch(err => {
          let msg = (err.response) ? err.response.errors[0].message : err.message;
          let errors = {};
          if(err.response) {
            err.response.errors.forEach(error => {
              if(error.message.includes("title")) errors.title = error.message;
            });
          }
          this.setState({ errors: errors });
          if(Object.keys(errors).length === 0) AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: msg });
          // reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    return (
      <Dialog
        className="UserEditModal Modal"
        icon="layer"
        onOpening={this.reset}
        onClose={this.props.onClose || undefined}
        title="Edit User"
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              label="Role"
              labelFor="role"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.role}
              intent={this.state.errors.role ? Intent.DANGER : Intent.NONE }
            >
              <HTMLSelect
                id="type"
                options={[
                  { label: "Choose a role...", value: undefined },
                  { label: "Administrator", value: "admin" },
                  { label: "Customer", value: "customer" },
                ]}
                value={this.state.values.role || undefined}
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, role: e.target.value}}) }}
                intent={this.state.errors.role ? Intent.DANGER : Intent.NONE }
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="Name"
              labelFor="name"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.name}
              intent={this.state.errors.name ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="name"
                value={this.state.values.name || ""}
                placeholder="Name"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, name: e.target.value}}) }}
                intent={this.state.errors.name ? Intent.DANGER : Intent.NONE }
                fill={true}
              />
            </FormGroup>

            <FormGroup
              label="E-Mail"
              labelFor="email"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.errors.email}
              intent={this.state.errors.email ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="email"
                value={this.state.values.email || ""}
                placeholder="E-Mail"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, email: e.target.value}}) }}
                intent={this.state.errors.email ? Intent.DANGER : Intent.NONE }
                autoComplete="off"
                fill={true}
              />
            </FormGroup>
            

            <FormGroup
              label="Password"
              labelFor="password"
              disabled={this.state.isLoading}
              helperText={this.state.errors.password}
              intent={this.state.errors.password ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.values.password || ""}
                placeholder="Password (hidden)"
                disabled={this.state.isLoading}
                onChange={(e) => { e.persist(); this.setState({values: {...this.state.values, password: e.target.value}}) }}
                intent={this.state.errors.password ? Intent.DANGER : Intent.NONE }
                autoComplete="off"
                fill={true}
                rightElement={
                  <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                      <Button
                        icon={this.state.showPassword ? "unlock" : "lock"}
                        intent={Intent.PRIMARY}
                        disabled={this.state.isLoading}
                        onClick={() => { this.setState({showPassword: !this.state.showPassword})}}
                        minimal={true}
                      />
                  </Tooltip>
                }
              />
            </FormGroup>
          </form>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={this.props.onClose || undefined}
              disabled={this.state.isLoading}
            >Cancel</Button>
            <Button
              intent={Intent.SUCCESS}
              onClick={this.handleSubmit}
              loading={this.state.isLoading}
            >Save changes</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserEditModal;