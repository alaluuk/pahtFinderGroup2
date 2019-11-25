import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Intent, Navbar, Alignment, ControlGroup, InputGroup, HTMLSelect, Spinner } from "@blueprintjs/core";
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
            <Navbar.Divider />
            <Button
              icon={this.props.primaryIcon || "plus"}
              text={this.props.primaryText || "Primary-Action"}
              intent={Intent.SUCCESS}
              onClick={this.props.primaryOnClick || undefined}
            />
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <ControlGroup fill={true} vertical={false}>
              {/* <HTMLSelect>
                <option value="by-name">By Name:</option>
                <option value="by-test">By Email:</option>
              </HTMLSelect> */}
              <InputGroup
                leftIcon="search"
                placeholder="Search..."
                rightElement={<Spinner size="15"></Spinner>}
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