import React from "react";
import { H3, Text } from "@blueprintjs/core";
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
            This is the protected Settings view.<br/>
          </Text>
        </div>
      </div>
    );
  }
}

export default SettingsView;