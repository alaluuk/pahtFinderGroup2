import React from "react";
import { AppName, AppVersion } from "../../App";
import { getClientURL } from "../../providers/graphql";
import { getAppMode, setAppMode } from "../../providers/mode";
import { performLogout } from "../../providers/auth";
import { H3, Text, Button, Card, Elevation, HTMLTable } from "@blueprintjs/core";
import HeaderComponent from "../../components/header";
import "./styles.scss";

class SettingsView extends React.Component {
  render() {
    return (
      <div className="SettingsView">
        <HeaderComponent user={this.props.user}></HeaderComponent>
        <div className="content-wrapper">
          <H3>Settings View</H3>
          <Card className="SettingsSystemCard" elevation={Elevation.ONE}>
            <HTMLTable bordered={false} condensed={true}>
              <tbody>
                <tr>
                  <th>App Mode</th>
                  <td><span className="bp3-text-muted">{getAppMode()}</span></td>
                </tr>
                <tr>
                  <th>GraphQL Base URL</th>
                  <td><span className="bp3-text-muted">{getClientURL()}</span></td>
                </tr>
              </tbody>
            </HTMLTable>
            <Button
              onClick={() => { performLogout().then(() => setAppMode((getAppMode() === 'development') ? 'production' : 'development')) }}
            >
              Switch to {(getAppMode() === 'development') ? 'production' : 'development'} mode
            </Button>
          </Card>
          <Text>
            <small className="bp3-text-muted">{AppName} (v{AppVersion})</small><br/>
          </Text>
        </div>
      </div>
    );
  }
}

export default SettingsView;