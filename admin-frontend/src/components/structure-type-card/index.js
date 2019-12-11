import React from "react";
import { Button, Card, H5, Classes, Collapse, Elevation, Popover, Menu, Intent, Position } from "@blueprintjs/core";
import StructureTemplateTable from "../../components/structure-template-table";
import "./styles.scss";

class StructureTypeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialFetched: false,
      isCollapsed: false,
      totalCount: null,
      isFilterable: false
    };

    this.templateTable = React.createRef();
    
    this.refetchData = this.refetchData.bind(this);
  }

  refetchData() {
    if(this.templateTable.current) this.templateTable.current.fetchStructureTemplates();
  }

  toggleCollapsed(collapse) {
    this.setState({ isCollapsed: collapse });
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
            {this.props.structureType.title}
            {(this.state.totalCount !== null) ? <span className="bp3-text-muted"> ({this.state.totalCount})</span> : ''}
          </H5>
          {/* <Button icon="new-layers" minimal="true" intent={Intent.SUCCESS}>New Template</Button> */}
          <Popover content={
            <Menu>
              <Menu.Item
                icon="new-layers" 
                text="Add a new template"
                onClick={this.props.onCreateTemplateClick || undefined}
              />
              <Menu.Item
                icon="edit" 
                text="Edit structure type"
                onClick={this.props.onEditClick || undefined}
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
                disabled={this.state.totalCount <= 0}
              />
              <Menu.Divider />
              <Menu.Item
                icon="trash" 
                text="Delete structure type"
                intent={Intent.DANGER}
                onClick={this.props.onDeleteClick || undefined}
              />
            </Menu>
          } position={Position.BOTTOM_RIGHT}>
            <Button icon="more" minimal="true" />
          </Popover>
        </div>
        <Collapse isOpen={!this.state.isCollapsed}>
          <StructureTemplateTable
            ref={this.templateTable}
            structureType={this.props.structureType}
            filterable={this.state.isFilterable}
            onFetchedData={(totalCount) => this.setState({
              totalCount: totalCount,
              initialFetched: true,
              isCollapsed: (!this.state.initialFetched && totalCount <= 0)
            })}
            onCreateClick={this.props.onCreateTemplateClick || undefined}
            onEditClick={(template) => (this.props.onEditTemplateClick) ? this.props.onEditTemplateClick(template) : undefined}
            onReportClick={(template) => (this.props.onReportTemplateClick) ? this.props.onReportTemplateClick(template) : undefined}
            onDeleteClick={(template) => (this.props.onDeleteTemplateClick) ? this.props.onDeleteTemplateClick(template) : undefined}
          />
        </Collapse>
      </Card>
    );
  }
}

export default StructureTypeCard;