import React from "react";
import { H3, Text } from "@blueprintjs/core";
import HeaderComponent from "../../components/header";
import "./styles.scss";

class DashboardView extends React.Component {
  render() {
    return (
      <div className="DashboardView">
        <HeaderComponent user={this.props.user}></HeaderComponent>
        <div className="content-wrapper">
          <H3>Dashboard View</H3>
          <Text>
            This is the protected dashboard view.<br/>
            {/* TODO: <b>LIMIT LOGIN ROLE (GraphQL)</b>, Gradient bg, card for content wrapper, quick actions, stats */}
          </Text>
          <br/>
          <pre className="bp3-code-block"><code>{JSON.stringify(this.props.user, null, 2)}</code></pre>
        </div>
      </div>
    );
  }
}

export default DashboardView;