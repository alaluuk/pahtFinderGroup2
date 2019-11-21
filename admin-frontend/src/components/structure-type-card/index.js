import React from "react";
import { Button, Card, H5, Classes, Collapse, Elevation, Popover, Menu, Intent, Position } from "@blueprintjs/core";
import StructureTemplateTable from "../../components/structure-template-table";
import "./styles.scss";

class StructureTypeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      structureType: this.props.structureType,
      isCollapsed: false,
      templateCount: null
    };
  }

  render() {
    return (
      <Card className="StructureTypeCard" elevation={Elevation.ONE}>
        <div className="StructureTypeCardHeader">
          <H5 className={Classes.TEXT_OVERFLOW_ELLIPSIS}>
            {this.state.structureType.title}
            {(this.state.templateCount !== null) ? <span className="bp3-text-muted"> ({this.state.templateCount})</span> : ''}
          </H5>
          <Popover content={
            <Menu>
              <Menu.Item
                icon="collapse-all" 
                text="Collapse structure type"
                onClick={() => { this.setState({ isCollapsed: !this.state.isCollapsed }) }}
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
            <Button icon="more" minimal="true"></Button>
          </Popover>
        </div>
        <Collapse isOpen={!this.state.isCollapsed}>
          <StructureTemplateTable
            structureType={this.state.structureType}
            onFetchedData={(data) => this.setState({ templateCount: data.structureTemplates.length, isCollapsed: (data.structureTemplates.length <= 0) })}
          />
        </Collapse>
      </Card>
    );
  }
}

export default StructureTypeCard;