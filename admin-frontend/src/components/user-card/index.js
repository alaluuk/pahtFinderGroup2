import React from "react";
import { rolesFormatter } from "../../providers/auth";
import { Card, Tag, H5, Button, Elevation, Popover, Position, Menu, Intent, Icon, Classes } from "@blueprintjs/core";
import "./styles.scss";

class UserCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Card className="UserCard" elevation={Elevation.ONE}>
        <div className="UserCardAvatarWrapper">
          <Icon icon="person" iconSize={32} />
        </div>
        <div className="UserCardInfoWrapper">
          <H5 className={Classes.TEXT_OVERFLOW_ELLIPSIS}>{this.props.user.name}</H5>
          <Tag className={"role-tag-"+this.props.user.role+" "+Classes.TEXT_OVERFLOW_ELLIPSIS} minimal={true}>{rolesFormatter(this.props.user.role)}</Tag>
        </div>
        <div className="UserCardActionWrapper">
          <Popover content={
            <Menu>
              <Menu.Item
                icon="edit" 
                text="Edit user"
                onClick={this.props.onEditClick || undefined}
              />
              <Menu.Divider />
              <Menu.Item
                icon="trash" 
                text="Delete user"
                intent={Intent.DANGER}
                onClick={this.props.onDeleteClick || undefined}
              />
            </Menu>
          } position={Position.RIGHT_TOP}>
            <Button icon="more" minimal="true"></Button>
          </Popover>
        </div>
      </Card>
    );
  }
}

export default UserCardComponent;