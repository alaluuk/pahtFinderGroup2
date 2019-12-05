import React from "react";
import { Route, Redirect } from "react-router-dom";
import GraphQLClient from "../../providers/graphql";
import HeaderComponent from "../../components/header";
import FilterableSubheaderComponent from "../../components/filterable-subheader";
import StructureTypeCard from "../../components/structure-type-card";
import StructureTypeCreateModal from "../../modals/structure-type-create";
import StructureTypeEditModal from "../../modals/structure-type-edit";
import StructureTypeDeleteModal from "../../modals/structure-type-delete";
import StructureTemplateCreateModal from "../../modals/structure-template-create";
import StructureTemplateDeleteModal from "../../modals/structure-template-delete";
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
          data.structureTypes.forEach(structureType => {
            this[`ref_type_card_${structureType.id}`] = React.createRef();
          });
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

  getStructureTypeIndex(id) {
    for (let i = 0; i < this.state.structureTypes.length; i++) {
      if(this.state.structureTypes[i].id === id) return i;
    }
    return undefined;
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
      view = this.state.structureTypes.map(structureType => <StructureTypeCard
        structureType={structureType}
        key={structureType.id}
        ref={this[`ref_type_card_${structureType.id}`]}
        onEditClick={() => this.props.history.replace(this.props.match.url+'/edit-type/'+structureType.id, { structureType: structureType })}
        onDeleteClick={() => this.props.history.replace(this.props.match.url+'/delete-type/'+structureType.id, { structureType: structureType })}
        onCreateTemplateClick={() => this.props.history.replace(this.props.match.url+'/create-template', { typeId: structureType.id })}
        onEditTemplateClick={(template) => this.props.history.replace(this.props.match.url+'/edit-template/'+template.id, { structureTemplate: template })}
        onDeleteTemplateClick={(template) => this.props.history.replace(this.props.match.url+'/delete-template/'+template.id, { structureTemplate: template })}
      />);
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
                onClick={() => { this.props.history.replace(this.props.match.url+'/create-template') }}
              />
              <Popover content={
                <Menu>
                  <Menu.Item
                    icon="new-layer" 
                    text="New Structure Type"
                    onClick={() => { this.props.history.replace(this.props.match.url+'/create-type') }}
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

        <Route
          path={`${this.props.match.url}/create-type`}
          render={(props) => {
            return (
              <StructureTypeCreateModal
                isOpen={true}
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onCreated={structureType => {
                  this.props.history.replace(this.props.match.url);
                  this[`ref_type_card_${structureType.id}`] = React.createRef();
                  let newStructureTypes = [...this.state.structureTypes];
                  newStructureTypes.push(structureType);
                  newStructureTypes.sort(function(a, b) {
                    if(a.title < b.title) { return -1; }
                    if(a.title > b.title) { return 1; }
                    return 0;
                  });
                  this.setState({structureTypes: newStructureTypes});
                }}
              />
            );
          }}
        />

        <Route
          path={`${this.props.match.url}/edit-type/:typeId`}
          render={({location, match}) => {
            let structureType = undefined;
            let structureTypeIndex = this.getStructureTypeIndex(match.params.typeId);
            if(structureTypeIndex !== undefined) structureType = this.state.structureTypes[structureTypeIndex];
            return (structureType) ? (
              <StructureTypeEditModal
                structureType={structureType}
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onEdited={(structureType) => {
                  if(structureTypeIndex !== undefined) {
                    let newStructureTypes = [...this.state.structureTypes];
                    newStructureTypes[structureTypeIndex] = structureType;
                    this.setState({ structureTypes: newStructureTypes });
                  }
                  this.props.history.replace(this.props.match.url);
                }}
              />
            ) : ( <Redirect to={{ pathname: this.props.match.url }} /> );
          }}
        />

        <Route
          path={`${this.props.match.url}/delete-type/:typeId`}
          render={({location, match}) => {
            let structureType = undefined;
            let structureTypeIndex = this.getStructureTypeIndex(match.params.typeId);
            if(structureTypeIndex !== undefined) structureType = this.state.structureTypes[structureTypeIndex];
            return (structureType) ? (
              <StructureTypeDeleteModal
                structureType={structureType}
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onDeleted={(data) => {
                  if(structureTypeIndex !== undefined) {
                    let newStructureTypes = [...this.state.structureTypes];
                    newStructureTypes.splice(structureTypeIndex, 1);
                    this.setState({ structureTypes: newStructureTypes });
                  }
                  this.props.history.replace(this.props.match.url);
                }}
              />
            ) : ( <Redirect to={{ pathname: this.props.match.url }} /> );
          }}
        />

        <Route
          path={`${this.props.match.url}/create-template`}
          render={({location}) => {
            return (
              <StructureTemplateCreateModal
                selectedStructureTypeId={(location.state && location.state.typeId) ? location.state.typeId : undefined}
                structureTypes={this.state.structureTypes}
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onCreated={(structureTemplate) => {
                  this.props.history.replace(this.props.match.url);
                  if(this[`ref_type_card_${structureTemplate.type.id}`].current) {
                    this[`ref_type_card_${structureTemplate.type.id}`].current.toggleCollapsed(false);
                    this[`ref_type_card_${structureTemplate.type.id}`].current.refetchData();
                  }
                }}
              />
            );
          }}
        />

        <Route
          path={`${this.props.match.url}/delete-template/:templateId`}
          render={({location, match}) => {
            let structureTemplate = location.state.structureTemplate;
            return (structureTemplate) ? (
              <StructureTemplateDeleteModal
                structureTemplate={structureTemplate}
                isOpen={true}  
                onClose={() => { this.props.history.replace(this.props.match.url) }}
                onDeleted={(data) => {
                  this.props.history.replace(this.props.match.url);
                  if(this[`ref_type_card_${structureTemplate.type.id}`].current) {
                    this[`ref_type_card_${structureTemplate.type.id}`].current.toggleCollapsed(false);
                    this[`ref_type_card_${structureTemplate.type.id}`].current.refetchData();
                  }
                }}
              />
            ) : ( <Redirect to={{ pathname: this.props.match.url }} /> );
          }}
        />
      </div>
    );
  }
}

export default StructuresView;