import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Intent, Navbar, Alignment, Popover, Menu, Position, Tag, H5, Text } from "@blueprintjs/core";
import { performLogout } from "../../providers/auth";
import { AppToaster } from "../../App";
import brandLogo from "../../assets/brand-logo.svg";
import "./styles.scss";

class UserCardComponent extends React.Component {
  render() {
    return (
      <div className="UserCardComponent">
        
      </div>
    );
  }
}

export default withRouter(UserCardComponent);