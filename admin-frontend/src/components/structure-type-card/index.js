import React from "react";
import { Button, Card, H5, Classes, Collapse, Elevation, Popover, Menu, Intent, Position } from "@blueprintjs/core";
import StructureTemplateTable from "../../components/structure-template-table";
import "./styles.scss";

class StructureTypeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      structureType: this.props.structureType,
      initialLoaded: false,
      isCollapsed: false,
      templateCount: null,
      isFilterable: false
    };
  }

  render() {
    return (
      <Card className="StructureTypeCard" elevation={Elevation.ONE}>
        <div className="StructureTypeCardHeader">
          <Button
            icon={(!this.state.isCollapsed) ? "chevron-down" : "chevron-right"} minimal="true"
            onClick={() => { this.setState({ isCollapsed: !this.state.isCollapsed }) }}
          />
          <H5 className={Classes.TEXT_OVERFLOW_ELLIPSIS}>
            {this.state.structureType.title}
            {(this.state.templateCount !== null) ? <span className="bp3-text-muted"> ({this.state.templateCount})</span> : ''}
          </H5>
          <Popover content={
            <Menu>
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
            onFetchedData={(data) => this.setState({
              templateCount: data.structureTemplates.length,
              initialLoaded: true,
              isCollapsed: (!this.state.initialLoaded && data.structureTemplates.length <= 0)
            })}
          />
        </Collapse>
      </Card>
    );
  }
}

export default StructureTypeCard;