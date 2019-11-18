import React from "react";
import HeaderComponent from "../../components/header";
import FilterableSubheaderComponent from "../../components/filterable-subheader";
import { H5 } from "@blueprintjs/core";
import "./styles.scss";

class StructuresView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="StructuresView">
        <HeaderComponent user={this.props.user} />
        <FilterableSubheaderComponent
          heading="Structure Templates"
          primaryIcon="new-layers"
          primaryText="New Structure Template"
          primaryOnClick={() => { this.setState({ isUserCreateModalOpen: true }) }}
        />
        <div className="content-wrapper">
        </div>
      </div>
    );
  }
}

export default StructuresView;