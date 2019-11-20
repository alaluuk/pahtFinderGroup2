import React from "react";
import { Button, Card, H5, Classes, Collapse, Elevation, Popover, Menu, Intent, Position } from "@blueprintjs/core";
import StructureTemplateTable from "../../components/structure-template-table";
import "./styles.scss";

class StructureTypeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      structureType: this.props.structureType,
      isCollapsed: false
    };
  }

  render() {
    return (
      <Card className="StructureTypeCard" elevation={Elevation.ONE}>
        <div className="StructureTypeCardHeader">
          <H5 className={Classes.TEXT_OVERFLOW_ELLIPSIS}>{this.state.structureType.title}</H5>
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
          <StructureTemplateTable structureType={this.state.structureType} />
        </Collapse>
      </Card>
    );
  }
}

export default StructureTypeCard;