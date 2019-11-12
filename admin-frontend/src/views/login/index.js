import React from 'react';
import { Text, Button, Card, Elevation, FormGroup, InputGroup, Tooltip, Intent, Checkbox, Divider } from "@blueprintjs/core";
import { AppToaster } from '../../App';
import { getSession, performLogin } from '../../providers/auth';
import brandLogo from '../../assets/brand-logo-text.svg';
import './LoginView.scss';

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    console.log(getSession());

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      staySignedIn: false,
      loading: false,
      errorMessage: false
    };

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let component = this;
    return new Promise((resolve, reject) => {
      component.setState({ loading: true });
      performLogin(component.state.email, component.state.password, component.state.staySignedIn)
        .then(data => {
          component.setState({ loading: false, errorMessage: false });
          AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Welcome back, "+data.user.name+"!" });
          resolve(data);
        })
        .catch(err => {
          console.error("Error while trying to login: ", err);
          let msg = (err.response) ? err.response.errors[0].message : "Unknown error while trying to login.";
          component.setState({ loading: false, errorMessage: "Invalid username and/or password." });
          AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: msg });
          reject(err);
        });
    });
  }

  render() {
    return (
      <div className="LoginView">
        <Card className="LoginViewCard" elevation={Elevation.THREE}>
          <img className="LoginViewLogo" src={brandLogo} alt="PathFinder Admin App"/>
          <Divider style={{ margin:"1rem 0" }}/>
          <Text className="bp3-text-muted">You must be authorized to access this application.</Text>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              label="Email"
              labelFor="login-email"
              labelInfo="(required)"
              disabled={this.state.loading}
              helperText={this.state.errorMessage}
              intent={this.state.errorMessage ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="login-email"
                ref={this.emailInput}
                value={this.state.email}
                placeholder="Email Address"
                disabled={this.state.loading}
                onChange={(e) => { this.setState({email: e.target.value})}}
                intent={this.state.errorMessage ? Intent.DANGER : Intent.NONE }
              />
            </FormGroup>

            <FormGroup
              label="Password"
              labelFor="login-password"
              labelInfo="(required)"
              disabled={this.state.loading}
              helperText={this.state.errorMessage}
              intent={this.state.errorMessage ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="login-password"
                ref={this.passwordInput}
                value={this.state.password}
                placeholder="Password"
                type={this.state.showPassword ? "text" : "password"}
                disabled={this.state.loading}
                onChange={(e) => { this.setState({password: e.target.value})}}
                intent={this.state.errorMessage ? Intent.DANGER : Intent.NONE }
                rightElement={
                  <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                      <Button
                        icon={this.state.showPassword ? "unlock" : "lock"}
                        intent={Intent.PRIMARY}
                        disabled={this.state.loading}
                        onClick={() => { this.setState({showPassword: !this.state.showPassword})}}
                        minimal={true}
                      />
                  </Tooltip>
                }
              />
            </FormGroup>

            <div className="LoginViewCardActions">
              <Checkbox
                checked={this.state.staySignedIn}
                label="Stay Signed In"
                disabled={this.state.loading}
                onChange={(e) => { this.setState({staySignedIn: !this.state.staySignedIn})}}
              />
              <Button
                rightIcon="arrow-right"
                intent={Intent.PRIMARY}
                type="submit"
                text="Submit"
                loading={this.state.loading}
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default LoginView;