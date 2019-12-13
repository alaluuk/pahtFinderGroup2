import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Navbar, Alignment, ControlGroup, InputGroup, /* Spinner */ } from "@blueprintjs/core";
import "./styles.scss";

class FilterableSubheaderComponent extends React.Component {
  render() {
    return (
      <Navbar className="FilterableSubheaderComponent">
        <div className="content-wrapper">
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>{this.props.heading || "Subheader-Title"}</Navbar.Heading>
            <Navbar.Divider />
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            {(this.props.primaryAction) ? <Navbar.Divider /> : null}
            {this.props.primaryAction || null}
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <ControlGroup fill={true} vertical={false}>
              <InputGroup
                leftIcon="search"
                placeholder="Search..."
                // rightElement={<Spinner size="15"></Spinner>}
              />
              <Button icon="filter"></Button>
            </ControlGroup>
          </Navbar.Group>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(FilterableSubheaderComponent);