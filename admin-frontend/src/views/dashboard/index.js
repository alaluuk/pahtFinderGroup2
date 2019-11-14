import React from "react";
import { Link } from "react-router-dom";
import { H3, Text, Button, Intent } from "@blueprintjs/core";
import { AppToaster } from "../../App";
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
          <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
          <br/><br/>
          <Link to="/login">/login</Link>
          <br/><br/>
          <Button
            onClick={() => { AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Test" }); }}
          >Launch Toast</Button>
        </div>
      </div>
    );
  }
}

export default DashboardView;