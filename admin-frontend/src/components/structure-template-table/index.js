import React from "react";
import GraphQLClient from "../../providers/graphql";
import EfficiencyIndicatorComponent from "../efficiency-indicator";
import { H5, Classes, NonIdealState, Spinner, Text, Icon, Intent } from "@blueprintjs/core";
import "./styles.scss";

class StructureTemplateTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fetchError: null,
      structureType: this.props.structureType || null, // TODO: Handle structureType null
      structureTemplates: [],
    };

    this.fetchStructureTemplates = this.fetchStructureTemplates.bind(this);
  }

  componentDidMount() {
    if(!this.state.isCollapsed) this.fetchStructureTemplates();
  }

  fetchStructureTemplates() {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      GraphQLClient.request(`
        query($structureTypeID: ID!) {
          structureTemplates(
            structureTypeID: $structureTypeID
          ) {
            id
            title
            createdAt
            updatedAt
          }
        }
      `, {
        structureTypeID: this.state.structureType.id
      })
        .then(data => {
          this.setState({ structureTemplates: data.structureTemplates });
          resolve(data.structureTemplates);
        })
        .catch(err => {
          this.setState({ fetchError: err });
          reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    let view;
    if(this.state.isLoading) {
      view = (
        <NonIdealState
          icon={<Spinner size="30"></Spinner>}
          title="Fetching structure templates..."
          description={
            <Text className="bp3-text-muted">Please wait while the structure templates are getting loaded.</Text>
          }
        />
      );
    } else if(this.state.fetchError) {
      view = (
        <NonIdealState
          icon={<Icon icon="issue" iconSize="30" intent={Intent.DANGER} />}
          title="Error while fetching the structure templates!"
          description={
            <Text className="bp3-text-muted">{
              (this.state.fetchError.response) ? this.state.fetchError.response.errors.map((err) => err.message+" ") : this.state.fetchError.message
            }</Text>
          }
        />
      );
    } else {
      view = this.state.structureTemplates.map(structureTemplate =>
        <div className="StructureTemplateTableRow">
          <H5 className={Classes.TEXT_OVERFLOW_ELLIPSIS} key={structureTemplate.id}>{structureTemplate.title}</H5>
          <EfficiencyIndicatorComponent percentage={Math.floor(Math.random() * 100) + 1} />
        </div>
      );
    }

    return <div className="StructureTemplateTable">{view}</div>;
  }
}

export default StructureTemplateTable;