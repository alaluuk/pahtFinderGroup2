import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Intent, Navbar, Alignment, Popover, Menu, Position, Tag, H5, Text } from "@blueprintjs/core";
import { performLogout, rolesFormatter } from "../../providers/auth";
import { AppToaster, setAppNightmode } from "../../App";
import brandLogo from "../../assets/brand-logo.svg";
import "./styles.scss";

class HeaderComponent extends React.Component {
  render() {
    return (
      <Navbar className="HeaderComponent">
        <div className="content-wrapper">
          <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading onClick={() => this.props.history.push('/')}>
                <img className="HeaderComponentLogo" src={brandLogo} alt="PathFinder Admin App"/>
              </Navbar.Heading>
              <Navbar.Divider />
              <Button
                className="bp3-minimal"
                icon="home"
                text="Dashboard"
                onClick={() => this.props.history.push('/')}
              />
              <Button
                className="bp3-minimal"
                icon="people"
                text="Users"
                onClick={() => this.props.history.push('/users')}
              />
              <Button
                className="bp3-minimal"
                icon="layers"
                text="Structures"
                onClick={() => this.props.history.push('/structures')}
              />
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
              <Navbar.Divider />
              <Popover content={
                <Menu>
                  <li>
                    <div className="HeaderComponentUser">
                      <H5>{this.props.user.name}</H5>
                      <Text className="bp3-text-muted" ellipsize={true}>{this.props.user.email}</Text>
                      <Tag className={"role-tag-"+this.props.user.role} minimal={true}>{rolesFormatter(this.props.user.role)}</Tag>
                    </div>
                  </li>
                  <Menu.Divider />
                  <Menu.Item
                    icon="moon"
                    text="Night Mode"
                    onClick={() => setAppNightmode(-1)}
                    label="⌘D"
                  />
                  <Menu.Divider />
                  <Menu.Item
                    icon="cog" 
                    text="User Settings"
                    onClick={() => this.props.history.push('/settings')}
                  />
                  <Menu.Item
                    icon="log-out"
                    onClick={() => {
                      performLogout()
                      .then(() => {
                        this.props.history.replace("/login");
                        AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Goodbye!" });
                      });
                    }}
                    text="Logout"
                    intent={Intent.DANGER}
                  />
                </Menu>
              } position={Position.BOTTOM_RIGHT} lazy="false">
                <Button icon="user" text={this.props.user.name} />
              </Popover>
          </Navbar.Group>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(HeaderComponent);