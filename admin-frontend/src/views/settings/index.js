import React from "react";
import { AppName, AppVersion } from "../../App";
import { getClientURL } from "../../providers/graphql";
import { getAppMode, setAppMode } from "../../providers/mode";
import { performLogout } from "../../providers/auth";
import { H3, Text, Button } from "@blueprintjs/core";
import HeaderComponent from "../../components/header";
import "./styles.scss";

class SettingsView extends React.Component {
  render() {
    return (
      <div className="SettingsView">
        <HeaderComponent user={this.props.user}></HeaderComponent>
        <div className="content-wrapper">
          <H3>Settings View</H3>
          <Text>
            <small className="bp3-text-muted">{AppName} (v{AppVersion})</small><br/>
            <small className="bp3-text-muted">Mode: {getAppMode()}</small><br/>
            <small className="bp3-text-muted">GraphQL Base URL: {getClientURL()}</small><br/>
            <Button
              onClick={() => { performLogout().then(() => setAppMode((getAppMode() === 'development') ? 'production' : 'development')) }}
            >Switch to {(getAppMode() === 'development') ? 'production' : 'development'} mode</Button>
          </Text>
        </div>
      </div>
    );
  }
}

export default SettingsView;