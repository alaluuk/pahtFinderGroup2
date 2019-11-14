import React from "react";
import { getSession, performLogin } from "../../providers/auth";
import { AppToaster } from "../../App";
import { Text, Button, Card, Elevation, FormGroup, InputGroup, Tooltip, Intent, Checkbox, Divider } from "@blueprintjs/core";
import brandLogoText from "../../assets/brand-logo-text.svg";
import "./styles.scss";

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    let { from } = this.props.location.state || { from: { pathname: "/" } };
    this.from = from;

    if(getSession() !== null) {
      this.props.history.replace(this.from);
    }

    this.state = {
      email: "",
      password: "",
      showPassword: false,
      staySignedIn: false,
      isLoading: false,
      emailError: false
    };

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, emailError: false, passwordError: false });
      performLogin(this.state.email, this.state.password, this.state.staySignedIn)
        .then(data => {
          AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Welcome back, "+data.user.name+"!" });
          this.props.history.push(this.props.history.replace(this.from));
          resolve(data);
        })
        .catch(err => {
          let msg = (err.response) ? err.response.errors[0].message : err.message;
          let emailError = false;
          let passwordError = false;
          if(err.response) {
            err.response.errors.forEach(error => {
              if(error.message.includes("email")) emailError = msg;
              if(error.message.includes("password")) passwordError = msg;
            });
          }
          this.setState({ emailError: emailError, passwordError: passwordError });
          if(!emailError && !passwordError) AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: msg });
          reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    return (
      <div className="LoginView">
        <Card className="LoginViewCard" elevation={Elevation.THREE}>
          <img className="LoginViewLogo" src={brandLogoText} alt="PathFinder Admin App"/>
          <Divider style={{ margin:"1rem 0" }}/>
          <Text className="bp3-text-muted">You must be authorized to access this application.</Text>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              label="Email"
              labelFor="login-email"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.emailError}
              intent={this.state.emailError ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="login-email"
                ref={this.emailInput}
                value={this.state.email}
                placeholder="Email Address"
                disabled={this.state.isLoading}
                onChange={(e) => { this.setState({email: e.target.value})}}
                intent={this.state.emailError ? Intent.DANGER : Intent.NONE }
              />
            </FormGroup>

            <FormGroup
              label="Password"
              labelFor="login-password"
              labelInfo="(required)"
              disabled={this.state.isLoading}
              helperText={this.state.passwordError}
              intent={this.state.passwordError ? Intent.DANGER : Intent.NONE }
            >
              <InputGroup
                id="login-password"
                ref={this.passwordInput}
                value={this.state.password}
                placeholder="Password"
                type={this.state.showPassword ? "text" : "password"}
                disabled={this.state.isLoading}
                onChange={(e) => { this.setState({password: e.target.value})}}
                intent={this.state.passwordError ? Intent.DANGER : Intent.NONE }
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

            <div className="LoginViewCardActions">
              <Checkbox
                checked={this.state.staySignedIn}
                label="Stay Signed In"
                disabled={this.state.isLoading}
                onChange={(e) => { this.setState({staySignedIn: !this.state.staySignedIn})}}
              />
              <Button
                rightIcon="arrow-right"
                intent={Intent.PRIMARY}
                type="submit"
                text="Submit"
                loading={this.state.isLoading}
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default LoginView;