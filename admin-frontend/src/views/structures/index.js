import React from "react";
import GraphQLClient from "../../providers/graphql";
import HeaderComponent from "../../components/header";
import FilterableSubheaderComponent from "../../components/filterable-subheader";
import StructureTypeCard from "../../components/structure-type-card";
import { Popover, Menu, Position, ButtonGroup, Button, Text, Spinner, NonIdealState, Icon, Intent } from "@blueprintjs/core";
import "./styles.scss";

class StructuresView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fetchError: null,
      structureTypes: []
    };

    this.fetchStructureTypes = this.fetchStructureTypes.bind(this);
  }

  componentDidMount() {
    this.fetchStructureTypes();
  }

  fetchStructureTypes() {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      GraphQLClient.request(`
        query {
          structureTypes(
            query: {
              sort: [{ id: "title", desc: false }]
            }
          ) {
            id
            title
            createdAt
            updatedAt
          }
        }
      `)
        .then(data => {
          this.setState({ structureTypes: data.structureTypes });
          resolve(data.structureTypes);
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
          title="Fetching Structure Types..."
          description={<Text className="bp3-text-muted">Please wait while the structure types are getting loaded.</Text>}
        />
      );
    } else if(this.state.fetchError) {
      view = (
        <NonIdealState
          icon={<Icon icon="issue" iconSize="30" intent={Intent.DANGER} />}
          title="Error while fetching the structure types!"
          description={<Text className="bp3-text-muted">{
            (this.state.fetchError.response) ? this.state.fetchError.response.errors.map((err) => err.message+" ") : this.state.fetchError.message
          }</Text> }
        />
      );
    } else {
      view = this.state.structureTypes.map(structureType =>
        <StructureTypeCard structureType={structureType} key={structureType.id} />
      );
    }

    return (
      <div className="StructuresView">
        <HeaderComponent user={this.props.user} />
        <FilterableSubheaderComponent
          heading="Structure Templates"
          primaryAction={
            <ButtonGroup>
              <Button
                icon="new-layers"
                text="New Structure Template"
                intent={Intent.SUCCESS}
                onClick={() => { this.setState({ isUserCreateModalOpen: true }) }}
              />
              <Popover content={
                <Menu>
                  <Menu.Item
                    icon="new-layer" 
                    text="New Structure Type"
                  />
                </Menu>
              } position={Position.BOTTOM_RIGHT}>
                <Button
                  icon="caret-down"
                  intent={Intent.SUCCESS}
                />
              </Popover>
            </ButtonGroup>
          }
        />
        <div className="content-wrapper">{view}</div>
      </div>
    );
  }
}

export default StructuresView;