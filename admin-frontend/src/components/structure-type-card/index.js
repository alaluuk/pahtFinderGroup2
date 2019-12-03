import React from "react";
import { Button, Card, H5, Classes, Collapse, Elevation, Popover, Menu, Intent, Position } from "@blueprintjs/core";
import StructureTemplateTable from "../../components/structure-template-table";
import StructureTemplateCreateModal from "../../modals/structure-template-create";
import "./styles.scss";

class StructureTypeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      structureType: this.props.structureType,
      initialLoaded: false,
      isCollapsed: false,
      totalCount: null,
      isFilterable: false,
      isTemplateCreateModalOpen: false
    };
  }

  render() {
    return (
      <Card className="StructureTypeCard" elevation={Elevation.ONE}>
        <div className={"StructureTypeCardHeader"+(this.state.isCollapsed ? " is-collapsed" : "")}>
          <Button
            icon={(!this.state.isCollapsed) ? "chevron-down" : "chevron-right"} minimal="true"
            onClick={() => { this.setState({ isCollapsed: !this.state.isCollapsed }) }}
          />
          <H5 className={Classes.TEXT_OVERFLOW_ELLIPSIS}>
            {this.state.structureType.title}
            {(this.state.totalCount !== null) ? <span className="bp3-text-muted"> ({this.state.totalCount})</span> : ''}
          </H5>
          {/* <Button icon="new-layers" minimal="true" intent={Intent.SUCCESS}>New Template</Button> */}
          <Popover content={
            <Menu>
              <Menu.Item
                icon="new-layers" 
                text="Create a new template"
                onClick={() => { this.setState({isTemplateCreateModalOpen: true}) }}
              />
              <Menu.Item
                icon={(!this.state.isCollapsed) ? "collapse-all" : "expand-all"} 
                text={(!this.state.isCollapsed) ? "Collapse templates list" : "Expand templates list"}
                onClick={() => { this.setState({ isCollapsed: !this.state.isCollapsed }) }}
              />
              <Menu.Item
                icon="search"
                text={(!this.state.isFilterable) ? "Enable template filtering" : "Disable template filtering"}
                onClick={() => { this.setState({ isFilterable: !this.state.isFilterable }) }}
              />
              <Menu.Divider />
              <Menu.Item
                icon="trash" 
                text="Delete structure type"
                intent={Intent.DANGER}
                onClick={() => { this.setState({ isUserDeleteModalOpen: true }) }}
              />
            </Menu>
          } position={Position.BOTTOM_RIGHT}>
            <Button icon="more" minimal="true" />
          </Popover>
        </div>
        <Collapse isOpen={!this.state.isCollapsed}>
          <StructureTemplateTable
            structureType={this.state.structureType}
            filterable={this.state.isFilterable}
            onFetchedData={(totalCount) => this.setState({
              totalCount: totalCount,
              initialLoaded: true,
              isCollapsed: (!this.state.initialLoaded && totalCount <= 0)
            })}
            handleNewTemplateModal={() => { this.setState({isTemplateCreateModalOpen: true}) }}
          />
        </Collapse>
        <StructureTemplateCreateModal
          structureType={this.state.structureType}
          isOpen={this.state.isTemplateCreateModalOpen}  
          onClose={() => { this.setState({isTemplateCreateModalOpen: false}) }}
          onCreated={() => { this.setState({isTemplateCreateModalOpen: false}) }} // TODO: Force template table refresh
        />
      </Card>
    );
  }
}

export default StructureTypeCard;